console.log("22" + 1); // 221
console.log(22 + "1"); // 221

console.log(+new Date() === new Date().getTime());// true
console.log(+new Date());// 1535079082742
console.log(new Date().getTime());// 1535079082742

var strint = "999";
console.log(--strint);// 998??????????????
console.log(typeof --strint);// number
