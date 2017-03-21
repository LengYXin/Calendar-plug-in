// import calendar from './calendar';

// window.onload = () => {
//     let datalistbody = document.querySelector("#DataList");
//     let list: Element = null;
//     let Callback = (e: Callback) => {
//         console.log("回调", e);
//         list
//         if (list) {
//             list.remove();
//         }
//         list = document.createElement("div");
//         list.classList.add("list-group");
//         e.Events.forEach((v) => {
//             let p = document.createElement("p");
//             p.classList.add("list-group-item");
//             let date = new Date(v.TimeStamp);
//             p.innerHTML = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate() + "：" + v.Name;
//             list.appendChild(p);
//         });
//         datalistbody.appendChild(list);
//     }
//     //
//     var cal = new calendar({
//         Date: null,
//         Element: "#DateLoad",
//         Callback: Callback,
//         //1490001712377
//         Events: [
//             {
//                 TimeStamp: 1490001390560, Name: "我是测试事件"
//             },
//             {
//                 TimeStamp: 1490001712377, Name: "我是测试事件2"
//             },
//             {
//                 TimeStamp: 1490025600000, Name: "我是测试事件3"
//             },
//             {
//                 TimeStamp: 1490889600000, Name: "我是测试事件4"
//             }
//         ]
//     });
//     document.querySelector("#pre").addEventListener("click", () => {
//         cal.pre();
//     });
//     document.querySelector("#next").addEventListener("click", () => {
//         cal.next();
//     });
// }