
// function test() {
//     this.x = 1;
// }

// function test() {
//     this.x = 1;
//     console.log(this.x);
//     console.log(this);
// }
// test();
// // 1
// // Window 对象

// var x = 99;
// function test() {
//     console.log(this.x);
// }
// test(); // 99

// var x = 25;
// function test() {
//     this.x = 0;
// }
// test();
// console.log(x);// 0

// function test() {
//     console.log(this.x);
// }
// var o = {};
// o.x = 996;
// o.m = test;
// o.m(); // 996

// function test() {
//     this.x = 888;
// }
// var o = new test();
// console.log(o.x); // 888

// var x = 999;
// function test(){
//     this.x = 888;
// }
// var o = new test();
// console.log(x); // 999

// var x = 999;
// function test() {
//     console.log(this.x);
// }
// var o = {};
// o.x = 888;
// o.m = test;
// o.m.apply(); // 999
// o.m.apply(o); // 888

function test (a, b, c) {
    var x = a + b
    [a, b, c].forEach(function (e) {
        // ...
    })
}
test(10, 20, 30);
// Uncaught TypeError: Cannot read property 'forEach' of undefined at test
