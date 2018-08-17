// 判断对象是否为空
var obj = {};
console.log(typeof obj);
console.log(JSON.stringify("{}"));
console.log(JSON.stringify({}));
if (typeof obj == "object" && JSON.stringify(obj) == "{}") {
    console.log("为空");
}





