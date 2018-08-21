// 如果需要一个总是返回某个数值整数部分的函数

function ToInteger(x) {
    x = Number(x);
    return x < 0 ? Math.ceil(x) : Math.floor(x);
}
console.log(ToInteger(3));// 3
console.log(ToInteger(3.2));// 3
console.log(ToInteger(3.5));// 3
console.log(ToInteger(3.8));// 3
console.log(ToInteger(0));// 0
console.log(ToInteger(-3));// -3
console.log(ToInteger(-3.2));// -3
console.log(ToInteger(-3.5));// -3
console.log(ToInteger(-3.8));// -3
// 上面代码中，不管正数或负数，ToInteger函数总是返回一个数值的整数部分。


