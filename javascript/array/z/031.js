/**
 * 判断js数组/对象是否为空
 * isPrototypeOf() 验证一个对象是否存在于另一个对象的原型链上。
 * 即判断 Object 是否存在于 $obj 的原型链上。js中一切皆对象，
 * 也就是说，Object 也存在于数组的原型链上，因此这里数组需要先于对象检验。
 * Object.keys() 返回一个由给定对象的自身可枚举属性组成的数组，
 * 数组中属性名的排列顺序和使用 for...in 循环遍历该对象时返回的顺序一致
 * @param $obj
 * @return {boolean}
 */
function isEmpty($obj) {
    // 检验非数组/对象类型
    // EX：undefined   null  ''
    // 根据自身要求添加其他适合的为空的值  如：0 ,'0','  '  等
    if (!$obj && $obj !== 0 && $obj !== '') return true;
    if (typeof $obj === "string") {
        $obj = $obj.replace(/\s*/g, "");//移除字符串中所有 ''
        if ($obj === '') return true;
    }
    return (Array.isArray($obj) && $obj.length === 0) || (Object.prototype.isPrototypeOf($obj) && Object.keys($obj).length === 0);
}
console.log(isEmpty(undefined));
console.log(isEmpty(null));
console.log(isEmpty(''));
console.log(isEmpty('      '));
console.log(isEmpty(new Array()));
console.log(isEmpty(new Object()));


