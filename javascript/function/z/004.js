var xxx = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
console.log(xxx);
function values () {
    // values有自己的arguments
    // 局部变量
    var i = 0,
        n = arguments.length,
        outerArgs = arguments;// 必须使用局部变量绑定当前函数的arguments对象，因为每个函数都有自己的arguments对象
    return {
        hasNext: function () {
            return i < n;
        },
        next: function () {
            if (i >= n) {
                throw new Error("the last element");
            }
            console.log(i);
            return outerArgs[i++];
        }
    }
}
var it = values('a', 'b', 'c', 'd', 'e', 'f', 'g');
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(xxx);
// this is arguments
function Test() {
    console.log(arguments[0]); // 3
    console.log(arguments[1]); // 4
    console.log(arguments[2]); // 5
    // 尽量不要修改arguments参数，容易造成混乱
    arguments[0] = 33;
    console.log(arguments[0]); // 33
    console.log(arguments[1]); // 4
    console.log(arguments[2]); // 5
    // really want to modify arguments?
    var arg = [].slice.call(arguments);
    arg[0] = 333;
    console.log(arg[0]); // 333
    console.log(arg[1]); // 4
    console.log(arg[2]); // 5
    console.log(arguments[0]); // 33
    console.log(arguments[1]); // 4
    console.log(arguments[2]); // 5
}
Test(3, 4, 5);

