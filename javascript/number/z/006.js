// // 构造函数
// var num1 = new Number(value);
// // 普通函数
// var num2 = Number(value);
// // 如无特殊情况，此种方式为创建Number类型数据首选方式。
// var num3 = 3;

console.log(Number(''));          // 0
console.log(Number(' '));         // 0
console.log(Number('a'));         // NaN
console.log(Number([]));          // 0
console.log(Number({}));          // NaN
console.log(Number([1]));         // 1
console.log(Number(['1']));       // 1
console.log(Number(['a']));       // NaN
console.log(Number({a:0}));       // NaN
console.log(Number(true));        // 1
console.log(Number(false));       // 0
console.log(Number('true'));      // NaN
console.log(Number('false'));     // NaN
console.log(Number(null));        // 0
console.log(Number(undefined));   // NaN
console.log(Number(NaN));         // NaN

var num1 = Number('66');
num1.prop = 'bar';
console.log(num1.prop);// undefined

var num2 = new String('66');
num2.prop = 'bar';
console.log(num2.prop);// bar

var y = 123e5;    // 12300000  科学计数
var z = 123e-5;   // 0.00123   科学计数
var pi = 3.14;    // 使用小数点
var nnum = Number('xxx');  // NaN

var num1 = new Number(7);
var num2 = Number(7);
// 创建数字首选方式
var num3 = 7;
console.log(num1 === num2);// false
console.log(num2 === num3);// true
console.log(typeof num1);// object
console.log(typeof num2);// number
console.log(typeof num3);// number

