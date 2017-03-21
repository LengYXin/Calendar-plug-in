interface config {
    Element: Element | string;
    Date?: Date | string;
    Callback?: Function;
    Events?: Events[];
}
interface Events {
    TimeStamp?: number, Name: string
}
interface currentTime {
    Day?: number,
    Date?: Date,
    preDate?: Date,
    nextDate?: Date,
    firstDay?: number,
    lastDay?: number,
    DateStr?: string,
    SelectElement?: HTMLLIElement
}
interface MonthData {
    Day: number, TimeStamp: number, Date: Date
}
interface monthDays {
    Key: any,
    currentTime:currentTime,
    MonthData: MonthData[],
    Element?: Element,
}
interface Callback {
    Element: Element,
    Date: Date,
    Events: Events[]
}
declare var Swiper:any;
interface Swiperinterface {
   
}
