// 数字
var a = NaN;
console.log(a ? '真' : '假');// 假
var a = 0;
console.log(a ? '真' : '假');// 假
// 字符串
var b = '';
console.log(b ? '真' : '假');// 假
// 布尔
var c = false;
console.log(c ? '真' : '假');// 假
// 数组
var d = [];
console.log(d ? '真' : '假');// 真
// 对象
var e = document;
console.log(e ? '真' : '假');// 真
var f = window;
console.log(f ? '真' : '假');// 真
var g = null;
console.log(g ? '真' : '假');// 假
var i = {};
console.log(i ? '真' : '假');// 真
// undefined（不明确的），分两种：1、未定义；2、已定义未赋值
var h;
console.log(h ? '真' : '假');// 假
console.log(i ? '真' : '假');// 真

if（判断语句）{
    // 执行语句1
} else if（判断语句2）{
    // 执行语句2
} else {
    // 执行语句3
}