function $$(id) {
    return document.getElementById(id);
}

/**
 * 数字格式转换成千分位
 *@param{Object}num
 */
function commafy (num) {
    // 1.先去除空格,判断是否空值和非数
    num = num + "";
    // 去除空格
    num = num.replace(/[ ]/g, "");
    if (num == "") {
        return;
    }
    if (isNaN(num)) {
        return;
    }
    // 2.针对是否有小数点，分情况处理
    var index = num.indexOf(".");
    // 无小数点
    if (index == -1) {
        var reg = /(-?\d+)(\d{3})/;
        while (reg.test(num)) {
            num = num.replace(reg, "$1,$2");
        }
    } else {
        var intPart = num.substring(0, index);
        var pointPart = num.substring(index + 1, num.length);
        var reg = /(-?\d+)(\d{3})/;
        while (reg.test(intPart)) {
            intPart = intPart.replace(reg, "$1,$2");
        }
        num = intPart + "." + pointPart;
    }
    return num;
}

/**
 * 去除千分位
 *@param{Object}num
 */
function delcommafy (num) {
    // 去除空格
    num = num.replace(/[ ]/g, "");
    num = num.replace(/,/gi,'');
    return num;
}

function doit (val) {
    if (val.indexOf(",") > -1) {
        $$("tx").value = delcommafy(val);
    } else {
        $$("tx").value = commafy(val);
    }
}

