// 因为+是量词，所以替换加号的正则必须加反斜杠进行转义。
var str = "a+b";
console.log(str.replace(/\+/g,''));

