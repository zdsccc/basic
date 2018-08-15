
// 值传递 deep copy
// 相当于值拷贝
// 基本数据类型：number、string、boolean、undefined、null
var a = 4;
var b = a;
a = 10;
console.log(b);// 4

// 引用传值 low copy
// 相当于地址拷贝
// array、object、function
// 该种情况，只要对变量进行赋值就会进行对内存的重新申请。
var arr = [1, 2];
var arr1 = arr;
arr.push(3);
console.log(arr1);// [1,2,3]
// 引用值时把第一个值放到第二个值里面，改变第一个值，第二个值也改变。
// 引用值是在栈内存里面存放堆的地址，拷贝的是地址，所以改变了arr，
// 实际上是改变了arr指向的地址内存放的内容，而arr和arr1指向同一个地址，故arr1也跟着变

var arr = [1,2];
var arr1 = arr;
arr = [1,3];
console.log(arr1);// [1,2];
// arr = [1,3]实际上是在堆内另建了一个地址，arr指向了新的地址，
// 而arr1还是指向原来的地址，故arr1值不变。

