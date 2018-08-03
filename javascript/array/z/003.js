// 取出数组中最大的值
var arrs = [11,152,21,5,31,23,90,102];
/*
    1、定义一个变量num
    2、让num的初始值是等于数组的第一个值
    3、拿num去和数组中的每一个值做比较，如果num小于arr[i],那就让num = arr[i]
    4、开始动手实现
*/
function max(arr)
{
    var num = arr[0];
    // 这种写法需要优化
    // for (var i = 0; i < arr.length; i++) {
    //     if(num < arr[i]) {
    //         num = arr[i]
    //     }
    // }
    // 优化方案 1
    // for (var i = 0, l = arr.length; i < arr.length; i++) {
    //     if(num < arr[i]) {
    //         num = arr[i]
    //     }
    // }
    // 优化方案 1 简写版
    // var i = 0, l = arr.length;
    // for (; i < arr.length; i++) {
    //     if(num < arr[i]) {
    //         num = arr[i]
    //     }
    // }
    // 优化方案 2，相对于优化方案 1，节省了 1 个变量 l
    for (var i = arr.length - 1; i >= 0; i--) {
        if(num < arr[i]) {
            num = arr[i]
        }
    }
    return num;
}
console.log(max(arrs)); // 152



