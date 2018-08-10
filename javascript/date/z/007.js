// ie 只支持 2018/05/03 格式的时间字符串
// ios 也是？

// 时间格式的字符串转变为时间格式
function convertDateFromString(dateString) {
    if(dateString) {
        var date = new Date(dateString.replace(/-/g, "/"))
        return date;
    }
}

console.log(convertDateFromString("2018-06-06"));


