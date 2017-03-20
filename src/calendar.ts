/**
 * date
 */
import dateProcessing from './dateProcessing';
export default class {
    constructor(obj: config) {
        this.config = obj;
        this.init();
        // window["Calendar"] = this;
        console.log(this);
        window.addEventListener("resize", () => {
            this.init();
        });
    }
    //配置
    private config: config;
    //日期数据
    private monthDays: monthDays = {};
    //当前时间数据
    private currentTime: currentTime = {};
    //日历容器
    private container: Element;

    //标题头
    private title = ["日", "一", "二", "三", "四", "五", "六"];
    /**
     * 初始化
     */
    private init() {
        // this.CreateDate();
        // this.DaterNew();
        let date = new dateProcessing(this.config);
        this.monthDays = date.monthDays;
        this.currentTime = date.currentTime;
        this.GetContainer();
        this.SetCalendar();
    }
    /**
     * 清空容器
     */
    private EmptyDlement() {
        // debugger
        if (this.container) {
            this.container.remove();
            this.container = null;
        }
    }
    /**
     * 获取创建日历容器
     */
    private GetContainer() {
        let e = this.config.Element;
        let container: Element;
        if (typeof e === "string") {
            container = document.querySelector(e);
        } else {
            container = e;
        }
        this.EmptyDlement();
        this.container = document.createElement("div");
        container.appendChild(this.container);
        //清空容器
        // console.dir(this.container);
        return this;
    }
    /**
     * 对比时间戳  事件 (同一天)
     * @param li 当前 de  li标签 （根标签）
     * @param e  存放 日期的容器
     * @param x 日期参数
     */
    private createLiEvent(li: Element, e: Element, x: MonthData) {
        this.config.Events.forEach(v => {
            let date = new Date(v.TimeStamp);
            // console.log(date.getFullYear(), x.Date.getFullYear());
            // console.log(date.getMonth(), x.Date.getMonth());
            // console.log(date.getDate(), x.Date.getDate());
            if (date.getFullYear() == x.Date.getFullYear()) {
                if (date.getMonth() == x.Date.getMonth()) {
                    if (date.getDate() == x.Date.getDate()) {
                        // let span = document.createElement("span");
                        // span.innerHTML = "*";
                        // e.appendChild(span);
                        let span = e.querySelector("span");
                        if (e.querySelector("span")) {
                            span.innerHTML += " *";
                        } else {
                            span = document.createElement("span");
                            span.innerHTML = "*";
                            e.appendChild(span);
                        }
                        let events = <Array<any>>li["$Events"] || [];
                        events.push(v);
                        li["$Events"] = events;
                    }
                }
            }
        });

    }
    /**
     * 创建 日期 li标签 （可根据需求更改为别的标签）
     * @param obj 日期参数 
     */
    private createLi(obj: { x: MonthData, liWH?: string, $Type?: string }) {
        let li = document.createElement("li");
        let div = document.createElement("div");
        let divDate = document.createElement("div");
        div.className = "day-con";
        divDate.className = "Date";
        divDate.innerHTML = obj.x.Day.toString();
        li["$calendar"] = obj.x;
        li["$Type"] = obj.$Type;
        li.style.width = obj.liWH + "px";
        li.style.height = obj.liWH + "px";
        div.appendChild(divDate);
        //日期事件
        this.createLiEvent(li, div, obj.x);
        li.appendChild(div);
        return li;
    }
    /**
     * 设置日历 绑定 dom对象
     * 默认为 有序列表 （UL）
     */
    private SetCalendar() {
        let TemplateTitle = document.createElement(`ul`)
            , TemplateBody = document.createElement("ul");
        ;
        let liWH = (this.container.clientWidth / 7 * 0.99).toFixed(2);
        this.title.forEach(x => {
            let li = document.createElement("li");
            li.style.width = liWH + "px";
            // li.style.height = liWH + "px";
            li.innerHTML = x;
            li.style.padding = "5px 0";
            TemplateTitle.appendChild(li);
        });

        //上
        this.monthDays.preMonth.forEach((x, i) => {
            if (i >= this.monthDays.preMonth.length - this.currentTime.firstDay) {
                let li = this.createLi({ x: x, liWH: liWH, $Type: "pre" });
                TemplateBody.appendChild(li);
            }
        });
        //当前
        this.monthDays.thisMonth.forEach(x => {
            let li = this.createLi({ x: x, liWH: liWH, $Type: "this" });
            li.classList.add("this");
            if (x.Day == this.currentTime.Day) {
                li.classList.add("Selected");
                this.currentTime.SelectElement = li;
                this.Callback();
            }
            TemplateBody.appendChild(li);
        });
        //下
        this.monthDays.nextMonth.forEach((x, i) => {
            if (i < 6 - this.currentTime.lastDay) {
                let li = this.createLi({ x: x, liWH: liWH, $Type: "next" });
                TemplateBody.appendChild(li);
            }
        });
        //日期点击事件
        TemplateBody.addEventListener("click", (x) => {
            this.DateEvent(x)
        });
        // debugger
        let p = document.createElement("h3");
        p.className = "text-center";
        p.innerHTML = this.currentTime.Date.getFullYear() + "-" + (this.currentTime.Date.getMonth() + 1);
        this.container.appendChild(p);
        this.container.appendChild(TemplateTitle);
        this.container.appendChild(TemplateBody);
        return this;
    }
    /**
     * 上个月
     * @param day 天 默认为1
     */
    public pre(day?) {
        this.config.Date = new Date(this.currentTime.preDate.getFullYear(), this.currentTime.preDate.getMonth(), day || 1);
        this.init();
    }
    /**
     * 下个月
     * @param day 天 默认为1
     */
    public next(day?) {
        this.config.Date = new Date(this.currentTime.nextDate.getFullYear(), this.currentTime.nextDate.getMonth(), day || 1);
        this.init();
    }
    /**
     * 点击事件 使用的事件委托 所以 需要找到 根元素 Li 节点后执行对应的事件
     * 执行回调事件
     * @param e 事件对象
     */
    private DateEvent(e: MouseEvent) {
        this.currentTime.SelectElement.classList.remove("Selected");
        this.currentTime.SelectElement = this.LookupLI(e.toElement) || this.currentTime.SelectElement;
        this.currentTime.Day = this.currentTime.SelectElement["$calendar"].Day;
        //点击当前 月份
        if (this.currentTime.SelectElement["$Type"] == "this") {
            this.currentTime.SelectElement.classList.add("Selected");
        } else {
            //上个月
            if (this.currentTime.SelectElement["$Type"] == "pre") {
                this.pre(this.currentTime.Day);
            }
            //下个月
            else {
                this.next(this.currentTime.Day);
            }
        }
        this.currentTime.Date.setDate(this.currentTime.Day);
        this.Callback();
    }
    /**
     * 查找li 标签
     * @param e 子标签
     */
    private LookupLI(e: Element) {
        try {
            if (e.nodeName == "LI") {
                return <HTMLLIElement>e;
            } else {
                return this.LookupLI(<Element>e.parentNode);
            }
        } catch (error) {
            return null;
        }
    }
    /**
     * 回调事件
     */
    private Callback() {
        this.config.Callback({
            Element: this.currentTime.SelectElement,
            Date: this.currentTime.Date,
            Events: this.currentTime.SelectElement["$Events"] || []
        });
    }

}