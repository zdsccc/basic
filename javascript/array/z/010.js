var arr = [10, 9, 8, 7];
console.log(arr); // 10,9,8,7
console.log(arr.length); // 4
arr.length = 3;
console.log(arr); // 10,9,8

// 快速清空数组的方法
arr.length = 0;
console.log(arr);//

arr.length = 10;
console.log(arr); // ,,,,,,,,,
console.log(arr[0]); // undefined
console.log(arr[9]); // undefined

