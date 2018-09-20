// 需求
// 交换 索引为 1 和 3 的元素
var arr = ["a", "b", "c", "d"];
var res = arr.splice(1, 0, arr[3]);
console.log(arr);// ["a", "d", "b", "c", "d"]
console.log(res);// []

arr = ["a", "b", "c", "d"];
res = arr.splice(3, 1, ...arr.splice(1, 1 , arr[3]));
console.log(arr);// ["a", "d", "c", "b"]
console.log(res);// ["d"]

// 解构赋值
arr = ["a", "b", "c", "d"];
[arr[0], arr[2]] = [arr[2], arr[0]];
console.log(arr);// ["c", "b", "a", "d"]
