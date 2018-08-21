// js中cookie操作
// * cookie中存在域的概念，使用path和domain区分；
// * 在同一域中的set和del可以操作同一名称的cookie，但不在同一域中的情况下，则set无法覆盖掉指定名称的cookie，del无法删除指定名称的cookie；

// 获取cookie
function getCookie(c_name)
{
    if (document.cookie.length > 0)
    {
        console.log(document.cookie);
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1)
        {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) c_end = document.cookie.length;
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}

// 设置cookie
function setCookie (c_name, value, expiredays)
{
    var cookieStr = "";
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + escape(value) +
        ((expiredays==null) ? "" : "; expires="+exdate.toGMTString())+";path=/";
}
//由于cookie存在域的概念，且在这里要不区分域，获取cookie的值，所以在这里使用的是统一的路径 path=/ ；

// 删除cookie
function delete_cookie (name, path, domain)
{
    if ( get_cookie( name ))
    {
        document.cookie = name + "=" +
            ((path) ? ";path="+path:"")+
            ((domain)?";domain="+domain:"") +
            ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
    }
}
function delete_cookie(name)
{
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
function delCookie(c_name)
{
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(c_name);
    if(cval!=null)
        document.cookie= c_name + "=;expires="+exp.toGMTString();
}
