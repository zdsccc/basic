// 声明一个全局变量
var trueval = 1;

// 创建一个全局变量
fakeval = 2;

// 同上
this.fackval2 = 3;

// false 变量没有被删除
console.log(delete trueval);

// true 变量被删除
console.log(delete fakeval);

// true 变量被删除
console.log(delete this.fackval2);

