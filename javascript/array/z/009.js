var arr = [1, 2, 3, 4];
// -2当做属性---(1)的情况
arr[-2] = 'name';
// 1.5当做属性---(1)的情况
arr[1.5] = 9;
// 数组索引，等价于arr[3]---(2)的情况
arr['3'] = 15;
// 数组索引，等价于arr[1]---(3)的情况
arr[1.00] = 23;
// 1.00当做属性1.00
arr['1.00'] = 4;
// age 属性
arr['age'] = 6;

// 空对象或非空的
var obj = {};
// 属性名为[object Object]:'5'
arr[obj] = '5';

console.log(arr);
console.log(arr.length);
// chrome output:
// [1, 23, 3, 15, -2: "name", 1.5: 9, 1.00: 4, age: 6, [object Object]: "5"]
// 4

// 长度为什么会是4呢？
// 原因：
// 数组的特别之处在于：
// 当使用小于等于 2^32-2 的非负整数作为属性名时，
// 数组会自动维护其 length 属性值；
var arr = [];
arr[Math.pow(2,32)-2] = 67; // 当做索引
arr[Math.pow(2,32)-1] = 22; // 当做属性名
console.log(arr.length);// 4294967295
console.log(arr);// [empty × 4294967294, 67, 4294967295: 22]

var arr = new Array(9); // 用法(b)
var arr = new Array('9'); // 用法(c)


