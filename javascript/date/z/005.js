
console.log(typeof Date);// "function"
console.log(typeof new Date());// "object"
// 获取本机的系统时间
console.log(new Date());
var time = new Date();
console.log(time.getFullYear());
console.log(time.getMonth());
console.log(time.getDate());
console.log(time.getDay());
console.log(time.getHours());
console.log(time.getMinutes());
console.log(time.getSeconds());
console.log(time.getMilliseconds());
console.log(time.getTime());

// ES5.1
console.log(Date.now());
// console.log(now());

