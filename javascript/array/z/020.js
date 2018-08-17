var z = {
    name : 'z',
    age : 12
};
var d = {
    name : 'ddd',
    age : 34
};
var s = {
    name : 'ss',
    age : 10
};
var arr = [z, d, s];
arr.sort(function(a, b) {
    // 1.按照年龄进行升序
    return a.age - b.age;
    // 2.按照名字长度升序
    // return a.name.length - b.name.length;
});
console.log(arr);


