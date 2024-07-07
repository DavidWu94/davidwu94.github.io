
var now = new Date();
const year = now.getFullYear();
const month = now.getMonth()+1>9?(now.getMonth()+1):'0'+(now.getMonth()+1).toString();
const date = now.getDate()>9?(now.getDate()):'0'+(now.getDate()).toString();
const hour = now.getHours()>9?(now.getHours()):'0'+(now.getHours()).toString();
const min = now.getMinutes()>9?(now.getMinutes()):'0'+(now.getMinutes()).toString();
const sec = now.getSeconds()>9?(now.getSeconds()):'0'+(now.getSeconds()).toString();

const fDatetime = `${year}-${month}-${date} ${hour}:${min}:${sec}`;