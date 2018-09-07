// 比较两个数组，然后返回一个新数组，该数组的元素为两个给定数组中所有独有的数组元素。
// 换言之，返回两个数组的差异。

function diff (arr1, arr2) {
    // 是否都是数组的判断
    // 是否都非空的判断
    return arr1.filter(function(item){
        return arr2.indexOf(item) === -1;
    }).concat(arr2.filter(function(item){
        return arr1.indexOf(item) === -1;
    }))
}
var arr1 = ['a', 'b', 'c'],
    arr2 = ['c', 'd', 'e'];
console.log(diff(arr1, arr2));// ['a','b','d','e']

function diff2(arr1, arr2) {
    var i, j;
    var newArr1 = [],
        newArr2 = [],
        l1 = arr1.length,
        l2 = arr2.length;
    for(i = 0; i < l1; i++) {
        if (arr2.indexOf(arr1[i]) === -1) {
            newArr1[newArr1.length] = arr1[i];
            // newArr1.push(arr1[i]);
        }
    }
    for(j = 0; j < l2; j++) {
        if (arr1.indexOf(arr2[j]) === -1) {
            newArr2[newArr2.length] = arr2[j];
            // newArr2.push(arr2[j]);
        }
    }
    return newArr1.concat(newArr2);
}
console.log(diff2(arr1, arr2));// ['a','b','d','e']

