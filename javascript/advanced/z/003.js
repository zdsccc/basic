// 浅拷贝实例：
// 此递归方法不包含数组对象
var obj = {
    a : 1,
    arr : [2, 3]
};
var shallowObj = shallowCopy(obj);
function shallowCopy (src) {
    var newobj = {};
    for (var prop in src) {
        if (src.hasOwnProperty(prop)) {
            newobj[prop] = src[prop];
        }
    }
    return newobj;
}

console.log(shallowObj);
