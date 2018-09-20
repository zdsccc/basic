// const numbers = [1, 2, 3, 4, 5];
// const result = numbers.toString();
// console.log(result);// 1, 2, 3, 4, 5
// console.log(typeof result);// string

// const numbers = [1, 2, 3, 4, 5];
// let str = numbers.reduce(function (prevEle, currentEle) {
//     // 哪一种更好？
//     // return prevEle + "," + currentEle;
//     return prevEle.toString() + "," + currentEle.toString();
// });
// console.log(str);// 1,2,3,4,5
// console.log(typeof str);// string

// numbers.reduce(function (prevEle,currentEle) {
//     console.log(prevEle,"|",currentEle);
// });
// 1 "|" 2
// undefined "|" 3
// undefined "|" 4
// undefined "|" 5

const arr = ["A", undefined, null, "B"];
let result = arr.join("|");
console.log(result);// A|||B

