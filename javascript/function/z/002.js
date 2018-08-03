// 按值传递
console.log("按值传递");
var value = 1;
function foo(v) {
    v = 2;
    console.log(v);// 2
}
foo(value);
console.log(value);// 1

// 按引用传递
console.log("按引用传递");
var obj = {
    value: 1
};
let foo2 = (o)=>{
    o.value = 2;
    console.log(o.value);// 2
};
foo2(obj);
console.log(obj.value);// 2

// 按共享传递
console.log("按共享传递");
var obj = {
    value: 1
};
function foo3(o) {
    o = 2;
    console.log(o.value); // undefined
}
foo3(obj);
console.log(obj.value);// 1
