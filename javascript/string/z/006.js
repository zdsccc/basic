function js_trim(str, which)
{
    switch (which) {
        case 1:
            // 首尾部一个或多个空格替换
            // 中文空格是：[　]
            // 英文空格是：\s
            // 正则表达式的意思是：
            // 如果str以一个或多个空格开始，替换全部空格为空，
            // 或者(|)，
            // 如果str以一个或多个空格结束，替换全部空格为空。
            return str.replace(/^(\s|　)+|(\s|　)+$/gm,'');
            break;
        case 2:
            // 换行符替换
            // 正则表达式的意思是：
            // 字符串头部和尾部，只要有\r或\n都会被替换掉
            return str.replace(/^(\r|\n)+|(\r|\n)+$/g,"");
            break;
        case 3:
            // 换行符替换
            // 正则表达式的意思是：
            // 字符串不论哪个位置，只要有\r或\n都会被替换掉
            return str.replace(/\r+|\n+/g,"");
            break;
    }
}
// 中文空格
var space_cn = "　";

// demo
// 头部英文空格，尾部中文空格
var cookie = "     this is a cookie value　　";
console.log(cookie);
console.log(js_trim(cookie, 1));
console.log("------------------------");

var str2 = "\r\nhttp://c\r.link\r\ntec\nh.cn/00DqU\ns\r\n";
console.log(str2);
console.log(js_trim(str2, 2));
console.log("------------------------");

var str3 = "\r\nhttp://c\r.link\r\ntec\nh.cn/00DqU\ns\r\n";
console.log(str3);
console.log(js_trim(str3, 3));
console.log("------------------------");


