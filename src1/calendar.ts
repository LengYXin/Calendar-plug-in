/**
 * date
 */
import dateProcessing from './dateProcessing';
export default class calendar {
    constructor(obj: config) {
        this._constructor(obj);
        this.init();
        // window["Calendar"] = this;
        window.addEventListener("resize", () => {
            this.init();
        });
    }
    _constructor(obj: config) {
        this.config = obj;
        let date = new Date();
        let y, m, d;
        if (typeof this.config.Date === "string") {
            let date_ = new Date(this.config.Date);
            y = date_.getFullYear();
            m = date_.getMonth();
            d = date_.getDate();
        }
        if (this.config.Date != null && typeof this.config.Date === "object") {
            y = this.config.Date.getFullYear();
            m = this.config.Date.getMonth();
            d = this.config.Date.getDate();
        } else {
            y = date.getFullYear();
            m = date.getMonth();
            d = date.getDate();
        }
        this.config.Date = new Date(y, m, d);
    }
    private dateProcessing = new dateProcessing();
    //配置
    private config: config;
    //日期数据
    private monthDays: monthDays[] = [];
    //当前时间数据
    private currentTime: currentTime = {};
    //日历容器
    private Container: {
        Root?: Element,
        Title?: Element,
        Body?: Element
    } = {};
    //标题头
    private title = ["日", "一", "二", "三", "四", "五", "六"];
    //每个li的宽高
    private liWH: string;
    /**
     * 初始化
     */
    private init(type?: string) {
        this.dateProcessing.CreateDate(this.monthDays, <Date>this.config.Date, type);
        // this.CreateDate();
        // this.DaterNew();
        this.GetContainer();
        this.SetCalendar();
        console.log(this);
    }
    private refreshMonthDays(type?: string) {
        this.dateProcessing.CreateDate(this.monthDays, <Date>this.config.Date, type);
        this.SetCalendar();
    }
    /**
     * 清空容器
     */
    private EmptyDlement() {
        // debugger
        if (this.Container.Body) {
            this.Container.Body.remove();
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
        this.Container.Root = container;
        this.Container.Title = document.createElement("div");
        this.Container.Body = document.createElement("div");
        this.Container.Title.classList.add("Date-Title");
        this.Container.Body.classList.add("Date-Body");
        this.Container.Body.classList.add("swiper-wrapper");
        this.Container.Root.appendChild(this.Container.Title);
        this.Container.Root.appendChild(this.Container.Body);
        this.liWH = (this.Container.Root.clientWidth / 7 * 0.99).toFixed(2) + "px";
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
    private createLi(x: MonthData) {
        let li = document.createElement("li");
        let div = document.createElement("div");
        let divDate = document.createElement("div");
        div.className = "day-con";
        divDate.className = "Date";
        divDate.innerHTML = x.Day.toString();
        li["$calendar"] = x;
        // li["$Type"] = obj.$Type;
        li.style.width = this.liWH;
        li.style.height = this.liWH;
        div.appendChild(divDate);
        //日期事件
        // this.createLiEvent(li, div, x);
        li.appendChild(div);
        return li;
    }
    /**
     * 创建 date （月）容器
     */
    private createUL(monthDays: monthDays): Element {
        let TemplateBody = document.createElement("ul");
        monthDays.MonthData.forEach(x => {
            let li = this.createLi(x);
            // li.classList.add("this");
            // if (x.Day == this.currentTime.Day) {
            //     li.classList.add("Selected");
            //     this.currentTime.SelectElement = li;
            //     this.Callback();
            // }
            TemplateBody.appendChild(li);
        });
        TemplateBody.classList.add("swiper-slide");
        return TemplateBody;
    }
    /**
     * 设置日历 绑定 dom对象
     * 默认为 有序列表 （UL）
     */
    private mySwiper = null;
    private SetCalendar() {
        // let TemplateTitle = document.createElement(`ul`) ;
        // this.title.forEach(x => {
        //     let li = document.createElement("li");
        //     li.style.width = this.liWH;
        //     // li.style.height = liWH + "px";
        //     li.innerHTML = x;
        //     li.style.padding = "5px 0";
        //     TemplateTitle.appendChild(li);
        // });
        // TemplateTitle.classList.add("Date-Title");

        // this.Container.Title.appendChild(TemplateTitle);
        this.monthDays.forEach(x => {
            this.Container.Body.appendChild(this.createUL(x));
        });
        //日期点击事件
        this.Container.Body.addEventListener("click", (x) => {
            this.DateEvent(<MouseEvent>x)
        });
        if (this.mySwiper) {
            this.mySwiper.destroy(false);
        }
        this.mySwiper = new Swiper('.swiper-container', {
            // Optional parameters
            // direction: 'vertical',
            // loop: true,
            paginationClickable: true
            // If we need pagination
            // pagination: '.swiper-pagination',

            // // Navigation arrows
            // nextButton: '.swiper-button-next',
            // prevButton: '.swiper-button-prev',

            // And if we need scrollbar
            // scrollbar: '.swiper-scrollbar',
        })
        return this;
    }
    /**
     * 上个月
     * @param day 天 默认为1
     */
    public pre(day?) {
        this.config.Date = new Date((<Date>this.config.Date).getFullYear(), (<Date>this.config.Date).getMonth() - 1, day || 1);
        this.refreshMonthDays("pre");
    }
    /**
     * 下个月
     * @param day 天 默认为1
     */
    public next(day?) {
        this.config.Date = new Date((<Date>this.config.Date).getFullYear(), (<Date>this.config.Date).getMonth() + 1, day || 1);
        this.refreshMonthDays("next");
    }
    /**
     * 点击事件 使用的事件委托 所以 需要找到 根元素 Li 节点后执行对应的事件
     * 执行回调事件
     * @param e 事件对象
     */
    private DateEvent(e: MouseEvent) {
        console.log("object", e);
        // this.currentTime.SelectElement.classList.remove("Selected");
        // this.currentTime.SelectElement = this.LookupLI(e.toElement) || this.currentTime.SelectElement;
        // this.currentTime.Day = this.currentTime.SelectElement["$calendar"].Day;
        // //点击当前 月份
        // if (this.currentTime.SelectElement["$Type"] == "this") {
        //     this.currentTime.SelectElement.classList.add("Selected");
        // } else {
        //     //上个月
        //     if (this.currentTime.SelectElement["$Type"] == "pre") {
        //         this.pre(this.currentTime.Day);
        //     }
        //     //下个月
        //     else {
        //         this.next(this.currentTime.Day);
        //     }
        // }
        // this.currentTime.Date.setDate(this.currentTime.Day);
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
            // Element: this.currentTime.SelectElement,
            // Date: this.currentTime.Date,
            // Events: this.currentTime.SelectElement["$Events"] || []
        });
    }

}