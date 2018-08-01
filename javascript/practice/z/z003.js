var goods = [
    {id:1,code:"group_buy"},
    {id:1,code:""}
];
console.log(goods);
var code_arr = [];
for (var index in goods) {
    // console.log("index", index, "index");
    code_arr.push(goods[index].code);
}
console.log("code_arr",code_arr,"code_arr");
