// 正常调用
console.log(location.host);// localhost:63342
console.log(location.pathname);// /basic/javascript/flow/index.html

// 在 with 下
with (location) {
    console.log(host);// localhost:63342
    console.log(pathname);// /basic/javascript/flow/index.html
}

var obj = {key: "string"};
var tmp;
var n = 1e6;
console.time("no with");
for (var i = 0; i < n; i++) {
    tmp = obj.key;
}
console.timeEnd("no with");// no with: 6.786865234375ms

console.time("with");
with (obj) {
    for (var i = 0; i < n; i++) {
        tmp = key;
    }
}
console.timeEnd("with");// with: 1285.317138671875ms

