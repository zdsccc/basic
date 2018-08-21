/**
 *
 * reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
 * (^|&)：开头是 & 或者不是 &
 * =([^&]*)：等于号后，非 & 的 0个或多个字符
 * (&|$)：以 & 或者空结尾
 *
 */

// http://www.jb51.net/article/110516.htm
// https://www.cnblogs.com/xuguanghui/p/6590331.html
// https://www.cnblogs.com/yx007/p/5688484.html

// 通过正则匹配获取当前页面的url中的参数
function _getQueryString(name)
{
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var absUrl = window.location.search.substr(1);
    var r = absUrl.match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

function m_getQueryString(url, name)
{
    var reg = new RegExp("^(\?|&)" + name + "=([^&]*)(&|$)");
    var r = url.match(reg);
    console.log(r);
    if (r != null) return unescape(r[2]);
    return null;
}

