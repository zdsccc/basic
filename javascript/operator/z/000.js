// 定义一个对象
var point = {
    x: 1,
    y: 1
};
console.log("x" in point); // true
console.log("z" in point); // false
console.log("toString" in point); // true:对象继承了toString()方法

