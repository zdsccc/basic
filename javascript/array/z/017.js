var arr = ['denpe.com', 2016, true, 1234, -1024, 10];

// 从索引 2 开始，移除 3 个元素
var res = arr.splice(2, 3);
console.log(arr);          // ["denpe.com", 2016, 10]
console.log(res);          // [true, 1234, -1024]

// 从索引 1 开始，移除 2 个元素，插入两个元素
var res1 = arr.splice(1, 2, 'newitem1', 'newitem2');
console.log(arr);          // ["denpe.com", "newitem1", "newitem2"]
console.log(res1);         // [2016, 10]

// 从索引 1 开始，移除 0 个元素，插入两个元素
var res2 = arr.splice(1, 0, 'abc', 'xyz');
console.log(arr);          // ["denpe.com", "abc", "xyz", "newitem1", "newitem2"]
console.log(res2);         // 返回空数组 []
