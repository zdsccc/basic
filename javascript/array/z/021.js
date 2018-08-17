

// 字节长度,汉字为2;字母为1;
function retBytes (str) {
    var num = str.length;
    for (var i = 0; i< str.length; i++){
        if (str.charCodeAt(i) > 255) {//返回指定位置的字符的 Unicode 编码;
            num += 1;
        }
    }
    return num;
}
var arr = ['Ming', '李dang', '王明', 'merheyka'];
arr.sort(function(a, b) {
    return retBytes(a) - retBytes(b);
});
console.log(arr);
// ["Ming", "王明", "李dang", "merheyka"]

