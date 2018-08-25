function calc() {
    console.log(arguments);
    console.log(arguments[0]);
    console.log(arguments.length);
    console.log(arguments.callee);
    arguments.pop();
}
// calc("sky", "moon");

function calc () {
    var newArr = Array.prototype.slice.call(arguments);
    newArr.pop();
    console.log(newArr);
}
calc("sky", "moon");

// 实现重载(overload)
function calc () {
    // 传1个参数
    if (arguments.length == 1) {
        return arguments[0] * arguments[0];
    }
    // 传2个参数
    else if (arguments.length == 2) {
        return arguments[0] + arguments[1];
    }
}
console.log(calc(5));// 25
console.log(calc(12, 23));// 35



