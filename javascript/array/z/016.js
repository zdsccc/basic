var arr = ['denpe.com', 2016, true, 1234];
// 提取索引 1 ~ 3 的部分(不包括索引3)
console.log(arr.slice(1, 3));       // [2016, true]
// start 为负  等价于 -3 + length = 1
console.log(arr.slice(-3, 3));      // [2016, true]
// 省略 end
console.log(arr.slice(1));          // [2016, true, 1234]
//end <= start 时返回空数组
console.log(arr.slice(3, 2));       // []
// 无参数
console.log(arr.slice());           // ["denpe.com", 2016, true, 1234]
console.log(arr.slice(1, -2));      // [2016]

