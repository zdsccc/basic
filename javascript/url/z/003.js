(function(window){
    // 需要解析的 url 地址
    var url = "https://www.baidu.com:8080/aaa/1.html?id=1&key=test#ffff";
    // 创建以个a标签
    var link = window.document.createElement("a");
    // 给 href 赋值
    link.href = url;
    console.log("protocol:"+link.protocol);// protocol:https:
    console.log("host:"+link.host);// host:www.baidu.com:8080
    console.log("hostname:"+link.hostname);// hostname:www.baidu.com
    console.log("port:"+link.port);// port:8080
    console.log("pathname:"+link.pathname);// pathname:/aaa/1.html
    console.log("search:"+link.search);// search:?id=1&key=test
    console.log("hash:"+link.hash);// hash:#ffff
})(window);

