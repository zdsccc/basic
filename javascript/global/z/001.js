console.log(parseInt('123ad'));// 123
console.log(parseInt('123'));// 123
console.log(parseInt('f3ad'));// NaN
console.log(parseInt(false));// NaN
console.log(parseInt(true));// NaN
console.log(parseInt(undefined));// NaN
console.log(parseInt(new Object()));// NaN
console.log(parseInt(Array(13, 2)));// 13
console.log(parseInt(31e5));// 3100000
console.log(parseInt(0b11));// 3
console.log(parseInt(0xff));// 255
console.log(parseInt(1.23));// 1
console.log(parseInt('12e2'));// 12
console.log(parseInt(null));// NaN
console.log(parseInt(1.5));// 1
console.log(parseInt(0132));// 90
console.log(parseInt("10",2));// 2
console.log(parseInt("FF",16));// 255
console.log(parseInt("10",8));// 8



