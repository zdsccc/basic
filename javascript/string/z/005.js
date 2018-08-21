// js判断空字符串、null、undefined、空格、中文空格
function js_isEmpty(obj)
{
    if (obj === null) return true;
    if (typeof obj === 'undefined')
    {
        return true;
    }
    if (typeof obj === 'string')
    {
        if (obj === "")
        {
            return true;
        }
        var reg = new RegExp("^([ ]+)|([　]+)$");
        return reg.test(obj);
    }
    return false;
}


