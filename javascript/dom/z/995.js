// 基于非 ie 的非行内样式获取法
function show() {
    var obj = document.getElementsByTagName("p")[0];
    console.log(getComputedStyle(obj, null)["width"]);// 200px
    console.log(getComputedStyle(obj, null)["height"]);// 100px
    console.log(getComputedStyle(obj, null)["background"]);// rgb(255, 192, 203) none repeat scroll 0% 0% / auto padding-box border-box
    // ie 和 非ie的兼容写法
    alert(obj.currentStyle?obj.currentStyle["width"]:getComputedStyle(obj, null)["width"]);
}


