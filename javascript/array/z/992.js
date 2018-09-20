let names = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice'];
// let countedNames = names.reduce(function (allNames, name){
//     // if...else...
//     // if (name in allNames) {
//     //     allNames[name]++;
//     // } else {
//     //     allNames[name] = 1;
//     // }
//     // 改写为三元运算符
//     (name in allNames) ? (allNames[name]++) : (allNames[name] = 1);
//     return allNames;
// },{})
// console.log(countedNames);// { 'Alice': 2, 'Bob': 1, 'Tiff': 1, 'Bruce': 1 }

let count = names.reduce(function (previousValue, currentValue){
    previousValue[currentValue] ? previousValue[currentValue]++ : previousValue[currentValue] = 1;
    return previousValue;
},[])
console.log(count);// [Alice: 2, Bob: 1, Tiff: 1, Bruce: 1]
console.log(typeof count);// Object
console.log(count.length);// 0

