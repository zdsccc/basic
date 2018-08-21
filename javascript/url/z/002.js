// ecshop app.main.js

function _getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var absUrl = $window.location.search.substr(1);
    var r = absUrl.match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

