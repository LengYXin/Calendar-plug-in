import calendar from './calendar';

window.onload = () => {
    var cal = new calendar({
        Date: null, Element: "#DateLoad", Callback: (e, t: Date) => {
            console.log("回调",  t.getFullYear() + "-" + (t.getMonth()+1) + "-" + t.getDate());
        }
    });
    document.querySelector("#pre").addEventListener("click", () => {
        cal.pre();
    });
    document.querySelector("#next").addEventListener("click", () => {
        cal.next();
    });
}