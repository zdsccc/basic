
// 常数
console.log(Math.E);
console.log(Math.LN2);
console.log(Math.LN10);
console.log(Math.LOG2E);
console.log(Math.LOG10E);
console.log(Math.PI);
console.log(Math.SQRT1_2);
console.log(Math.SQRT2);

// 三角函数方法
console.log(Math.sin(0));// 0
console.log(Math.cos(0));// 1
console.log(Math.tan(0));// 0
console.log(Math.asin(1));// 1.5707963267948966
console.log(Math.acos(1));// 0
console.log(Math.atan(1));// 0.7853981633974483

// 方法
console.log(Math.abs(1));// 1
console.log(Math.abs(-1));// 1

console.log(Math.max(2, -1, 5));// 5
console.log(Math.min(2, -1, 5));// -1
console.log(Math.min());// Infinity
console.log(Math.max());// -Infinity

console.log(Math.floor(3.2));// 3
console.log(Math.floor(-3.2));// -4

console.log(Math.ceil(3.2));// 4
console.log(Math.ceil(-3.2));// -3

console.log(Math.pow(2, 2));// 4
console.log(Math.pow(2, 3));// 8
// 计算圆面积
var radius = 20;
var area = Math.PI * Math.pow(radius, 2);
console.log(area);// 1256.6370614359173

console.log(Math.sqrt(4));// 2
console.log(Math.sqrt(-4));// NaN

console.log(Math.log(Math.E));// 1
console.log(Math.log(10));// 2.302585092994046

console.log(Math.log(100) / Math.LN10);// 2
console.log(Math.log(8) / Math.LN2);// 3

console.log(Math.round(0.1));// 0
console.log(Math.round(0.5));// 1
console.log(Math.round(0.6));// 1
// 等同于 Math.floor(x + 0.5)
console.log(Math.floor(0.1 + 0.5));// 0
console.log(Math.floor(0.5 + 0.5));// 1
console.log(Math.floor(0.6 + 0.5));// 1

console.log(Math.round(-1.1));// -1
console.log(Math.round(-1.5));// -1
console.log(Math.round(-1.6));// -2
// 等同于 Math.floor(x + 0.5)
console.log(Math.floor(-1.1 + 0.5));// -1
console.log(Math.floor(-1.5 + 0.5));// -1
console.log(Math.floor(-1.6 + 0.5));// -2

console.log(Math.exp(1));// 2.718281828459045
console.log(Math.exp(3));// 20.085536923187668

console.log(Math.random());// 0.05870389145090682
console.log(Math.random());// 0.3994553173535702
console.log(Math.random());// 0.8707392371739331




