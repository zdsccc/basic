//先定义一个某数值范围内的随机数
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// 克隆数组方法
/**
 * 克隆数组
 * @param  {array} arr 原数组
 * @return {array}     新数组
 */
function cloneArr(arr) {
    // 从第一个字符就开始 copy
    // slice(start,end) 方法可从已有的数组中返回选定的元素。
    return arr.slice(0);
}

// 洗牌
function shuffle(arr, flag = false) {
    // console.log('arr',arr);
    let newArr = [];
    flag ? (newArr = arr) : (newArr = cloneArr(arr));

    for (let i = 0; i < newArr.length; i++) {
        let j = getRandom(0, i);
        console.log(j);
        let temp = newArr[i];
        newArr[i] = newArr[j];
        newArr[j] = temp;
    }
    // console.log('arr',arr,newArr);
    return newArr;
}
var list = [1,3,5,6,7,8,9,115,117];
// 调用
console.log(list);
console.log(shuffle(list)); // list一般为数组对象
console.log(list);

console.log(list);
console.log(shuffle(list,true)); // list一般为数组对象
console.log(list);

