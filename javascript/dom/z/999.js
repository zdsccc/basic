
function test () {
    // 拿到select对象
    var myselect = document.getElementById("test");

    // 拿到选中项的索引
    // selectedIndex代表的是你所选中项的index
    var index = myselect.selectedIndex;

    // 拿到选中项options的value
    console.log(myselect.options[index].value);

    // 拿到选中项options的text
    console.log(myselect.options[index].text);
}
