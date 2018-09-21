var obj;

// 一般情况下，属性加不加引号是一样的
// obj = {
//     name: "zhangdashuai",
//     age: 29
// };
// console.log(obj.name);// zhangdashuai
// console.log(obj.age);// 29

// 纯数字索引的情况
// 声明时可加引号，可不加引号
// 访问时，必须使用中括号访问方式，中括号内可加引号，也可不加引号
// obj = {
//     1: "yesman",
//     2: "gavin"
// };
// Uncaught SyntaxError: missing ) after argument list
// console.log(obj.1);
// Uncaught SyntaxError: missing ) after argument list
// console.log(obj.2);
// console.log(obj[1]);// yesman
// console.log(obj[2]);// gavin
// console.log(obj["1"]);// yesman
// console.log(obj["2"]);// gavin

// 数字开头+字符串的索引
// 声明时，必须加引号
// 访问时，必须使用中括号访问方式，中括号内必须加引号
// obj = {
//     // Uncaught SyntaxError: Invalid or unexpected token
//     // 1score: 100,
//     "1score": 100,
//     // Uncaught SyntaxError: Invalid or unexpected token
//     // 2score: 99
//     "2score": 99
// };
// Uncaught SyntaxError: Invalid or unexpected token
// console.log(obj.1score);
// Uncaught SyntaxError: Invalid or unexpected token
// console.log(obj.2score);

// Uncaught SyntaxError: Invalid or unexpected token
// console.log(obj[1score]);
// Uncaught SyntaxError: Invalid or unexpected token
// console.log(obj[2score]);

// console.log(obj["1score"]);// 100
// console.log(obj["2score"]);// 99

// 属性名称为空字符串或空格字符串
// 声明时，必须加引号
// 访问时，必须使用中括号访问方式，中括号内必须加引号
obj = {
    "": "空",
    " ": "一个空格"
};
console.log(obj[""]);// 空
console.log(obj[" "]);// 一个空格

