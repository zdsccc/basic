console.log(1 - 0.8);// 0.19999999999999996
console.log(6 * 0.7);// 4.199999999999999
console.log(0.1 + 0.2);// 0.30000000000000004
console.log(0.1 + 0.7);// 0.7999999999999999
console.log(1.2 / 0.2);// 5.999999999999999

// 解决方案
console.log((1 * 10 - 0.8 * 10) / 10);// 0.2

// 原理是：
// 将浮点数乘以（扩大）10的n次方倍，把浮点数变为整数后再进行相应的运算
// 最后将得到的结果除以（缩小）10的n次方倍。

// 加减乘除的封装
// 加
function floatAdd(arg1, arg2)
{
    var r1, r2, m;
    try {
        r1 = arg1.toString().split(".")[1].length
    } catch(e) {
        r1 = 0
    }
    try {
        r2 = arg2.toString().split(".")[1].length
    } catch(e) {
        r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2));
    return (arg1 * m + arg2 * m) / m;
}
// 减
function floatSub(arg1, arg2)
{
    var r1, r2, m, n;
    try {
        r1 = arg1.toString().split(".")[1].length
    } catch(e) {
        r1 = 0
    }
    try {
        r2 = arg2.toString().split(".")[1].length
    } catch(e) {
        r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2));
    //动态控制精度长度
    n = (r1 >= r2) ? r1 : r2;
    return ((arg1 * m - arg2 * m) / m).toFixed(n);
}
// 乘
function floatMul(arg1, arg2)
{
    var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
    try {
        m += s1.split(".")[1].length
    } catch(e) {
        //
    }
    try {
        m += s2.split(".")[1].length
    }catch(e){
        //
    }
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
}
// 除
function floatDiv(arg1, arg2)
{
    var t1 = 0, t2 = 0, r1, r2;
    try {
        t1 = arg1.toString().split(".")[1].length
    } catch(e) {
        //
    }
    try {
        t2 = arg2.toString().split(".")[1].length
    }catch(e){
        //
    }
    r1 = Number(arg1.toString().replace(".", ""));
    r2 = Number(arg2.toString().replace(".", ""));
    return (r1 / r2) * Math.pow(10, t2 - t1);
}
