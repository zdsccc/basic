// 增加前导0函数
function p(s)
{
    return s < 10 ? '0' + s : s;
}
var myDate = new Date();
// 获取当前年
var year = myDate.getFullYear();
// 获取当前月
var month = myDate.getMonth() + 1;
// 获取当前日
var date = myDate.getDate();
// 获取当前小时数(0-23)
var h = myDate.getHours();
// 获取当前分钟数(0-59)
var m = myDate.getMinutes();
// 获取当前秒数(0-59)
var s = myDate.getSeconds();
var now = year
    + '-'
    + p(month)
    + "-"
    + p(date)
    + " "
    + p(h)
    + ':'
    + p(m)
    + ":"
    + p(s);


