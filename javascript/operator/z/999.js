
var d = new Date();// 通过Date()构造函数实例化一个新的对象
console.log(d instanceof Date);// true
console.log(d instanceof Object);// true
console.log(d instanceof Number);// false

var o = {
    x: 3
};
var p = null;
console.log(o && o.x);// o 和 o.x 都为真，返回 o.x 的值 3
console.log(p && p.x);// p 为假值，返回 p 的值 null，不去计算 p.x

// 如果max_width已经定义，直接使用它；否则在preferences对象中查找max_width
// 如果没有定义它，则使用一个写死的常量
// var max = max_width || preference.max_width || 500;

var data = [1, 2, 3, 4];
for (var i = 0; i < 4; i++) {
    // 根据表达式从左到右的运算顺序，++运算法则，先计算 data[i] 的值为 1，i 再加 1
    // 1 * 2 = 2,求得第一个值，i++，i 为 3，再次执行循环
    console.log(data[i++] *= 2);
    // 2
    // 6
}
for (var j = 0; j < data.length; j++) {
    // 同上，先计算 = 左边的值后，j + 1 变为 1，然后计算右边的表达式值，
    // 此时 j 为 1，data[j] = 2，求得第一个值为 4，然后 j + 1 变为 2，
    // j++，j 为 3，再次执行循环
    console.log(data[j++] = data[j++] * 2);
    // 4
    // NaN
}

var geval = eval;    // 使用别名调用eval将是全局eval
var x = "global",
    y = "global";
function f() {     // 函数内执行的是局部的eval
    var x = "local";
    eval("x += 'change';");     // 直接eval更改局部变量的值
    return x;     // 返回更改后的局部变量
}
function g() {     // 函数内执行的是全局的eval
    var y = "local";
    geval("y += 'changed';"); // 间接调用更改了全局变量的值
    return y;    // 返回未更改的局部变量
}
console.log(f(), x);     // localchange global
console.log(g(), y);    // local globalchanged

var o = { x : 1, y : 2};// 定义一个对象
delete o.x;             // 删除一个属性
console.log("x" in o);  // false 属性不存在
var a = [1, 2, 3];      // 定义一个数组
delete a[2];            // 删除索引为2 的数组元素
console.log(2 in a);    // false 索引为2的数组元素不存在
console.log(a.length);  // 3，数组长度并没有改变，因为其它值的索引并没有改变

var o = { x:1, y:2};
console.log(delete o.x); // true
console.log(typeof o.x); // undefined 属性不存在
console.log(delete o.x); // true 不存在属性
console.log(delete o);   // false var声明不能删除
console.log(delete 1);   // true 不是左值（属性）
this.x = 1;              // 全局定义一个属性
console.log(delete x);   // true(非严格模式下) 严格模式下使用 delete this.x


