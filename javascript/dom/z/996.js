// 基于 ie 的非行内样式获取法
function show() {
    var obj = document.getElementsByTagName("p")[0];
    // ie 不支持 console 对象
    alert(obj.currentStyle.width);// 200px
    alert(obj.currentStyle.height);// 100px
    // alert(obj.currentStyle.background);//
    // alert(obj.currentStyle.background-color);//
    alert(obj.currentStyle.backgroundColor);// pink
}


