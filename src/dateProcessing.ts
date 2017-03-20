export default class {
    constructor(config: config) {
        this.CreateDate(config);
        this.DaterNew();

    }
    //日期数据
    public monthDays: monthDays = {};
    public currentTime: currentTime = {};
    //创建时间参数
    private CreateDate(config: config) {
        let date = new Date();
        let y, m, d;
        if (typeof config.Date === "string") {
            let date_ = new Date(config.Date);
            y = date_.getFullYear();
            m = date_.getMonth();
            d = date_.getDate();
        }
        if (config.Date != null && typeof config.Date === "object") {
            y = config.Date.getFullYear();
            m = config.Date.getMonth();
            d = config.Date.getDate();
        } else {
            y = date.getFullYear();
            m = date.getMonth();
            d = date.getDate();
        }
        this.currentTime.Day = d;
        // this.currentTime.DateStr = y + "-" + (m + 1) + "-" + d;
        this.currentTime.Date = new Date(y, m, d);//当前日期
        this.currentTime.preDate = new Date(y, m);//上一个月
        this.currentTime.preDate.setDate(0);
        this.currentTime.nextDate = new Date(y, m + 1);//下一个月
        this.currentTime.firstDay = new Date(y, m).getDay();//1号 星期
        this.currentTime.lastDay = new Date(y, m, this.DaysInMonth(y, m)).getDay();//最后一天 星期
        // console.log(this.currentTime);
    }
    //创建3个月的时间数组
    private DaterNew() {
        this.monthDays = {
            preMonth: [],
            thisMonth: [],
            nextMonth: []
        };
        let y = this.currentTime.Date.getFullYear(),
            m = this.currentTime.Date.getMonth(),
            d = this.currentTime.Date.getDate(),
            DaysInMonth = this.DaysInMonth(y, m)
            ;

        //当前月天数
        for (let i = 1; i <= DaysInMonth; i++) {
            // this.monthDays.thisMonth.push(i);
            let date = new Date(y, m);
            date.setDate(i);
            this.monthDays.thisMonth.push({ Day: i, Date: date, TimeStamp: date.getTime() });
        }
        //上一个月
        let preDate = new Date(this.currentTime.preDate.getFullYear(), this.currentTime.preDate.getMonth());
        let premDays = this.DaysInMonth(preDate.getFullYear(), preDate.getMonth());
        for (let i = 1; i <= premDays; i++) {
            // this.monthDays.preMonth.push(i);
            let date = new Date(preDate.getFullYear(), preDate.getMonth());
            date.setDate(i);
            this.monthDays.preMonth.push({ Day: i, Date: date, TimeStamp: date.getTime() });
        }
        //下一个月
        let nextDate = new Date(this.currentTime.nextDate.getFullYear(), this.currentTime.nextDate.getMonth());
        let nextDays = this.DaysInMonth(nextDate.getFullYear(), nextDate.getMonth());
        for (let i = 1; i <= nextDays; i++) {
            // this.monthDays.nextMonth.push(i);
            let date = new Date(nextDate.getFullYear(), nextDate.getMonth());
            date.setDate(i);
            this.monthDays.nextMonth.push({ Day: i, Date: date, TimeStamp: date.getTime() });

        }
        return this;
    };
    //返回一个月得总天数
    private DaysInMonth(year, month) {
        return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
    }
}