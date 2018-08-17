var arr = ['denpe.com', 2016, true, 1234];

// 按照ASCII字符顺序进行升序排列
console.log(arr.sort());// [1234, 2016, "denpe.com", true]

var arr1 = [12,5,8,3,2,14];
//  升序排列
function compareNumbers(a, b) {
    return a - b;
}
console.log(arr1.sort(compareNumbers));// [2, 3, 5, 8, 12, 14]

// sort()方法可以使用函数表达式方便地书写：
var numbers = [4, 2, 5, 1, 3];
numbers.sort(function(a, b) {
    return a - b;
});
console.log(numbers);// [1, 2, 3, 4, 5]

// 对象可以按照某个属性排序
var items = [
    { name: 'Edward', value: 21 },
    { name: 'Sharpe', value: 37 },
    { name: 'And', value: 45 },
    { name: 'The', value: -12 },
    { name: 'Magnetic' },
    { name: 'Zeros', value: 37 }
];
items.sort(function (a, b) {
    if (a.value > b.value) {
        return 1;
    }
    if (a.value < b.value) {
        return -1;
    }
    return 0;
});
console.log(items);
