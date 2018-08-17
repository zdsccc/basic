var arr1 = [1, 2, 3];
var arr2 = ['denpe.com', 2016];
var arr = arr1.concat(arr2);
console.log(arr1);// arr1不变
console.log(arr2);// arr2不变
console.log(arr); // [1, 2, 3, "denpe.com", 2016]


// 完全复制(值类型)
var arr = [2016, 'denpe.com', true];
var result = arr.concat();
console.log(result);// [2016, "denpe.com", true]

// 浅复制(引用类型)
var obj = {
    domain: 'denpe.com',
    year: 2015
};
var arr1 = [1, 2, 3, obj];
var newresult = arr1.concat();   // [1, 2, 3, Object]
console.log(newresult[3].year);  // 2015
obj.year = 2016;
console.log(newresult[3].year);   // 2016
var arr2 = [1, 2, [11, 22]];
var arr3 = arr2.concat();
arr2[2][0] = 'denpe.com';
console.log(arr3[2][0]);          // denpe.com

