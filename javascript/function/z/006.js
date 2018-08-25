
// 内存溢出
// Uncaught RangeError: Maximum call stack size exceeded
function foo(){
    console.log("函数 foo 是递归函数。");
    foo();
}
// foo();

// 用递归输出对象里包含的所有属性值（包括对象里的子孙对象）
var obj = {
    a:{
        name: "john",
        age: 26,
        sex: "male",
        child: {
            firstChild: "mak",
            laseChild: "loy"
        }
    },
    b: {
        name: "joe",
        age: 28,
        sex: "female",
        child: {
            firstChild: "bill",
            secondChild: "ruth",
            laseChild: "yoki"
        }
    }
};

function getObjValue(obj) {
    for(var k in obj){
        if(typeof obj[k] !== "object"){
            console.log(obj[k]); //递归出口
        }else{
            getObjValue(obj[k]); //函数调用函数自身
        }
    }
};

// getObjValue(obj);

// 输出结果：
// john
// 26
// male
// mak
// loy
// joe
// 28
// female
// bill
// ruth
// yoki


function factorial(num)
{
    if(num <= 1)
    {
        return 1;
    }
    else
    {
        return num * factorial(num - 1);
    }
}
function factorial(num)
{
    if(num <= 1)
    {
        return 1;
    }
    else
    {
        return num * arguments.callee(num - 1);
    }
}

console.log(factorial(5));// 120
var anotherFactorial = factorial;
console.log(anotherFactorial(6));// 720

factorial = null;
console.log(anotherFactorial(7));
// Uncaught TypeError: factorial is not a function

// 斐波拉契题(兔子生兔子题目)--从出生后第3个月起每个月都生一对兔子，小兔子长到第三个月后每个月又生一对兔子，假如兔子都不死，问每个月的兔子对数为多少
// 产量分析：1， 1， 2， 3， 5， 8， 13， 21 。。。
// 第n个月的兔子总数  =  第n-1个月的兔子总数 + 第n-2个月的兔子总数
// 问题： 求任意月兔子的总数

function func( n )
{
    if (n == 0 || n == 1)
    {
        return 1;
    }
    return func(n - 1) + func(n - 2);
}

console.log(func(22));// 28657

