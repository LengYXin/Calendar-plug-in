export default class dateProcessing {
    constructor() {
        // this.CreateDate(config);
        // console.log(this.Dater(this.currentTime.Date));
    }
    //日期数据
    // public monthDays: monthDays[] = [];
    // public currentTime: currentTime = {};
    //创建时间参数
    public CreateDate(monthDays: monthDays[], date: Date, type?: string) {
        let y, m, d;

        y = date.getFullYear();
        m = date.getMonth();
        d = date.getDate();
        let currentTime: currentTime = this.currentTime(date);
        // debugger
        switch (type) {
            case "pre":
                let preKey = this.createKey(currentTime.preDate);
                let preDys = monthDays.filter(x => {
                    return x.Key == preKey;
                });
                if (!preDys|| preDys.length <= 0) {
                    monthDays.unshift({ Key: preKey, currentTime: this.currentTime(currentTime.preDate), MonthData: this.Dater(currentTime.preDate) })
                }
                break;
            case "next":
                let nextKey = this.createKey(currentTime.nextDate);
                let nextDys = monthDays.filter(x => {
                    return x.Key == nextKey;
                });
                if (!nextDys || nextDys.length <= 0) {
                    monthDays.push({ Key: nextKey, currentTime: this.currentTime(currentTime.nextDate), MonthData: this.Dater(currentTime.nextDate) })
                }
                break;
            default:
                monthDays.push({ Key: this.createKey(currentTime.preDate), currentTime: this.currentTime(currentTime.preDate), MonthData: this.Dater(currentTime.preDate) });
                monthDays.push({ Key: this.createKey(currentTime.Date), currentTime: this.currentTime(currentTime.Date), MonthData: this.Dater(currentTime.Date) });
                monthDays.push({ Key: this.createKey(currentTime.nextDate), currentTime: this.currentTime(currentTime.nextDate), MonthData: this.Dater(currentTime.nextDate) });
                break;
        }
    }
    private currentTime(date: Date): currentTime {
        let y, m, d;
        y = date.getFullYear();
        m = date.getMonth();
        d = date.getDate();
        let currentTime: currentTime = {};
        currentTime.Day = d;
        currentTime.DateStr = y + "-" + (m + 1) + "-" + d;
        currentTime.Date = new Date(y, m, d);//当前日期
        currentTime.preDate = new Date(y, m - 1);//上一个月
        currentTime.nextDate = new Date(y, m + 1);//下一个月
        currentTime.firstDay = new Date(y, m).getDay();//1号 星期
        currentTime.lastDay = new Date(y, m, this.DaysInMonth(y, m)).getDay();//最后一天 星期
        return currentTime;
    }
    private Dater(prateDate: Date): MonthData[] {
        let y = prateDate.getFullYear(),
            m = prateDate.getMonth(),
            d = prateDate.getDate(),
            firstDay = new Date(y, m).getDay(),//1号 星期?
            lastDay = new Date(y, m, this.DaysInMonth(y, m)).getDay(),//最后一天 星期
            thisMonth = [],//当前月数组
            DaysInMonth = this.DaysInMonth(y, m)//天数
            ;
        //上一个月
        let preDate = new Date(y, m - 1);
        let premDays = this.DaysInMonth(preDate.getFullYear(), preDate.getMonth());
        for (let i = premDays - firstDay + 1; i <= premDays; i++) {
            let date = new Date(preDate.getFullYear(), preDate.getMonth());
            date.setDate(i);
            thisMonth.push({ Day: i, Date: date, TimeStamp: date.getTime() });
        }
        //当前月天数
        for (let i = 1; i <= DaysInMonth; i++) {
            let date = new Date(y, m);
            date.setDate(i);
            thisMonth.push({ Day: i, Date: date, TimeStamp: date.getTime() });
        }
        //下一个月
        let nextDate = new Date(y, m + 1);
        // let nextDays = this.DaysInMonth(nextDate.getFullYear(), nextDate.getMonth());
        for (let i = 1; i <= 6 - lastDay; i++) {
            let date = new Date(nextDate.getFullYear(), nextDate.getMonth());
            date.setDate(i);
            thisMonth.push({ Day: i, Date: date, TimeStamp: date.getTime() });
        }
        return thisMonth;
    }
    //返回一个月得总天数
    private DaysInMonth(year, month) {
        return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
    }
    private createKey(date: Date): string {
        let str = date.getFullYear() + "-" + (date.getMonth() + 1);
        return str;
    }

}