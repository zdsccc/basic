console.log(Function.length);             // 1
console.log(Function.prototype.length);   // 0

function two(a, b) {
    console.log(two.length);
}
function one(a) {
    console.log(one.length);
}
two();          // 2
one();          // 1
two(1, 2, 3);   // 仍然是 2

function myFunc() {
    if (myFunc.caller == null) {
        console.log("该函数在全局作用域内被调用!");
    } else {
        console.log("调用我的是函数是" + myFunc.caller);
    }
}
myFunc();
// 该函数在全局作用域内被调用!
function test() {
    myFunc()
}
// 调用我的是函数是function test() { myFunc() }

