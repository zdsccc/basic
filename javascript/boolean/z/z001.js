
// 全部返回false
console.log(Boolean(0));
console.log(Boolean(-0));
console.log(Boolean(null));
console.log(Boolean(undefined));
console.log(Boolean(''));
console.log(Boolean(NaN));
console.log(Boolean(false));

// 全部返回true
console.log(Boolean(' '));
console.log(Boolean('false'));
console.log(Boolean([]));
console.log(Boolean({}));
console.log(Boolean('0'));

// boolean 值
var boo_value = Boolean('66');
boo_value.prop = 'bar';
console.log(typeof boo_value);// boolean
console.log(boo_value.prop);// undefined

// boolean 对象
var boo_object = new Boolean('66');
boo_object.prop = 'bar';
console.log(typeof boo_object);// object
console.log(boo_object.prop);// "bar"

// 注意：不要在该使用 Boolean值的地方使用 Boolean对象。
var boo_object = new Boolean(false);
if(boo_object) {
    // 这里代码会被执行
    console.log("boo_object");
}
var boo_value = Boolean(false);
if(boo_value) {
    // 这里代码不会被执行
    console.log("boo_value");
}

// url传参hasAuth，定义时为boolean值，另一页面接收到后为string类型
var hasAuth = 'true';
if(hasAuth) {
    // 此时的hasAuth是true
}
var hasAuth = 'false';
if(hasAuth) {
    // 此时的hasAuth还是true
}


