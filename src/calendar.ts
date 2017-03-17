/**
 * date
 */
interface config {
    Element: Element | string;
    Date?: Date | string;
    Callback?: Function;
}
export default class {
    constructor(obj: config) {
        this.config = obj;
        this.init();
        // window["Calendar"] = this;
        console.log(this);
    }
    private config: config
    //日期数据
    private monthDays = {
        preMonthDays: [],
        thisMonthDays: [],
        nextMonthDays: []
    };
    private currentTime: {
        Day?: number,
        Date?: Date,
        preDate?: Date,
        nextDate?: Date,
        firstDay?: number,
        lastDay?: number,
        DateStr?: string,
        SelectElement?: HTMLLIElement
    } = {};
    //日历容器
    private container: Element;
    //标题头
    private title = ["日", "一", "二", "三", "四", "五", "六"];
    private init() {
        this.CreateDate();
        this.DaterNew();
        this.GetContainer(this.config.Element);
        this.SetCalendar();
    }
    //创建时间参数
    private CreateDate() {
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
        this.currentTime.Day = d;
        this.currentTime.DateStr = y + "-" + (m + 1) + "-" + d;
        this.currentTime.Date = new Date(y, m, d);//当前日期
        this.currentTime.preDate = new Date(y, m);//上一个月
        this.currentTime.preDate.setDate(0);
        this.currentTime.nextDate = new Date(y, m + 1);//下一个月
        this.currentTime.firstDay = new Date(y, m).getDay();//1号 星期
        this.currentTime.lastDay = new Date(y, m, this.DaysInMonth(y, m)).getDay();//最后一天 星期
    }
    //创建3个月的时间数组
    private DaterNew() {
        this.monthDays = {
            preMonthDays: [],
            thisMonthDays: [],
            nextMonthDays: []
        };
        let y = this.currentTime.Date.getFullYear(),
            m = this.currentTime.Date.getMonth(),
            d = this.currentTime.Date.getDate(),
            DaysInMonth = this.DaysInMonth(y, m)
            ;

        //当前月天数
        for (let i = 1; i <= DaysInMonth; i++) {
            this.monthDays.thisMonthDays.push(i);
        }
        //上一个月
        let preDate = this.currentTime.preDate;
        let premDays = this.DaysInMonth(preDate.getFullYear(), preDate.getMonth());
        for (let i = 1; i <= premDays; i++) {
            this.monthDays.preMonthDays.push(i);
        }
        //下一个月
        let nextDate = this.currentTime.nextDate;
        let nextDays = this.DaysInMonth(nextDate.getFullYear(), nextDate.getMonth());
        for (let i = 1; i <= nextDays; i++) {
            this.monthDays.nextMonthDays.push(i);
        }
        return this;
    };
    //返回一个月得总天数
    private DaysInMonth(year, month) {
        return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
    }
    //获取创建日历容器
    private GetContainer(e: Element | string) {
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
    // 设置日历
    private SetCalendar() {
        let TemplateTitle = document.createElement(`ul`)
            , TemplateBody = document.createElement("ul");
        ;
        let liWH = (this.container.clientWidth / 7 * 0.99).toFixed(2);
        //创建 li标签
        let createLi = (x) => {
            let li = document.createElement("li");
            li.innerHTML = x;
            li["$calendar"] = x;
            li.style.width = liWH + "px";
            li.style.height = liWH + "px";
            return li;
        }
        this.title.forEach(x => {
            TemplateTitle.appendChild(createLi(x));
        });

        //上
        this.monthDays.preMonthDays.forEach((x, i) => {
            if (i >= this.monthDays.preMonthDays.length - this.currentTime.firstDay) {
                let li = createLi(x);
                li["$Type"] = "pre";
                TemplateBody.appendChild(li);
            }
        });
        //当前
        this.monthDays.thisMonthDays.forEach(x => {
            let li = createLi(x);
            let span = document.createElement("span");
            span.innerHTML = "*"
            span.style.color = "red";
            span["$calendar"] = x;
            span["$Type"] = "this";
            li["$Type"] = "this";
            li.appendChild(span);
            if (x == this.currentTime.Day) {
                li.style.backgroundColor = "red";
                this.currentTime.SelectElement = li;
            }
            TemplateBody.appendChild(li);
        });
        //下
        this.monthDays.nextMonthDays.forEach((x, i) => {
            if (i < 6 - this.currentTime.lastDay) {
                let li = createLi(x);
                li["$Type"] = "next";
                TemplateBody.appendChild(li);
            }
        });
        //日期点击事件
        TemplateBody.addEventListener("click", (x) => {
            this.DateEvent(x)
        });
        // debugger
        let p = document.createElement("p");
        p.className = "text-center";
        p.innerHTML = this.currentTime.Date.getFullYear() + "-" + (this.currentTime.Date.getMonth() + 1);
        this.container.appendChild(p);
        this.container.appendChild(TemplateTitle);
        this.container.appendChild(TemplateBody);
        return this;
    }
    //清空元素
    private EmptyDlement() {
        // debugger
        if (this.container) {
            this.container.remove();
            this.container = null;
        }
    }
    public pre(day?) {
        this.config.Date = new Date(this.currentTime.preDate.getFullYear(), this.currentTime.preDate.getMonth(), day || 1);
        this.init();
    }
    public next(day?) {
        this.config.Date = new Date(this.currentTime.nextDate.getFullYear(), this.currentTime.nextDate.getMonth(), day || 1);
        this.init();
    }
    //点击事件
    private DateEvent(e: MouseEvent) {
        this.currentTime.Day = e.toElement["$calendar"];
        // console.log(e.toElement["$Type"], e);
        if (e.toElement.nodeName != "LI" && e.toElement.nodeName != "SPAN") {
            return;
        }
        if (e.toElement["$Type"] == "this") {

            this.currentTime.SelectElement.style.backgroundColor = "";
            // console.log("DateEvent", e);
            this.currentTime.SelectElement = <HTMLLIElement>e.toElement;
            if (e.toElement.nodeName == "SPAN") {
                this.currentTime.SelectElement = <HTMLLIElement>e.toElement.parentNode
            }
            this.currentTime.SelectElement.style.backgroundColor = "red";
        } else {
            if (e.toElement["$Type"] == "pre") {
                this.pre(this.currentTime.Day);
            } else {
                this.next(this.currentTime.Day);
            }
        }
        this.currentTime.Date.setDate(this.currentTime.Day);
        this.config.Callback(this.currentTime.SelectElement, this.currentTime.Date);
    }

}