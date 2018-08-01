/*
new生成一个对象的过程


使用新对象调用函数，函数中的this被指向新的对象
初始化完毕新对象地址，保存在等号左边的变量中
*/

var arr = new Array();
console.log(arr);

// 1、生成一个空对象 var obj={};
var obj = {};

// 2、设置新对象的constructor属性为构造函数的名称，
// 设置对象的_proto_属性指向构造函数的prototype对象
obj.constructor = Array();

