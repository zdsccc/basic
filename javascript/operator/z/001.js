
var a, b;
a = 2;
b = 0;
console.log(a || b);
a = null;
b = 9;
console.log(a || b);
b = 3;
console.log(a || b);
a = undefined;
b = null;
console.log(a || b);

