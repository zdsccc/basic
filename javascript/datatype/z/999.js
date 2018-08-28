
var a = '300';
var b = 'abc';
console.log(parseInt(a));// 300
console.log(parseInt(b));// NaN
console.log(isNaN(parseInt(a)));// false
console.log(isNaN(parseInt(b)));// true
// 请使用 isNaN() 来判断一个值是否是数字。原因是 NaN 与所有值都不相等，包括它自己。
console.log(300 === NaN);// false
console.log(NaN === NaN);// false
