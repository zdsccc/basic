var slice = Array.prototype.slice;
var toString = Object.prototype.toString;

(function () {
    var args = arguments;
    console.log(args, toString.call(args));
    // [1, 2, 3] "[object Arguments]"
    var argsArr = slice.call(args, 0);
    console.log(argsArr, toString.call(argsArr));
    // [1, 2, 3] "[object Array]"
}(1, 2, 3));


var slice = Array.prototype.slice;
// 字符串
console.log(slice.call('string'));// ["s", "t", "r", "i", "n", "g"]
console.log(slice.call(new String('string')));// ["s", "t", "r", "i", "n", "g"]

// 数字--->空数组
console.log(slice.call(654));// []

// 布尔值--->空数组
console.log(slice.call(true));// []

// 普通的对象--->空数组
// 除非给它加上length属性
console.log(slice.call({name: 'obj'}));// []
console.log(slice.call({0: 'zero', 1: 'one'}));// []
console.log(slice.call({0: 'zero', 1: 'one', name: 'obj', length: 2}));// ["zero", "one"]


