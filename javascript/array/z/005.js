var undefs = [ , , ];
console.log(undefs.length);
// output：2
// 为什么数组的长度是2而不是3呢？
// 直接量定义数组结尾允许有可选的逗号，所以长度是2

var arr = [,,];
console.log(arr);
// chrome output:
// [empty × 2]

// 只有一个数值参数时，不能为小数
var arr = new Array(3.4);
console.log(arr);
// Uncaught RangeError: Invalid array length ...


