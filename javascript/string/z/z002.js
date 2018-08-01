/*
 * Reverse a String（翻转字符串）
 * 题目要求：
 * 把字符串转化成数组
 * 借助数组的reverse方法翻转数组顺序
 * 把数组转化成字符串
 *
 * 思路：
 * 用.split('')将字符串转换成单个字母组成的数组
 * 用.reverse()把数组反转
 * 用.join('')把数组元素连接成字符串
 *
 * 代码如下：
 */

function reverseString(str) {
    var tmp = [];
    tmp = str.split("");
    tmp = tmp.reverse();
    str = tmp.join("");
    return str;
}
console.log(reverseString("hello"));
console.log(reverseString("中华renmin共和国wansui"));

