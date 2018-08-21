// in_array函数，判断数组中是否含有某个元素。
Array.prototype.in_array = function(e) {
    for (i = 0; i < this.length; i++) {
        if(this[i] == e)
            return true;
    }
    return false;
};
// 使用方法：
var tmp = ['d', 'dd', 'ddd'];
console.log(tmp.in_array("dddd"));



