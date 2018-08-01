var arr = [
    {name: "张三", age: 18},
    {name: "李四", age: 16},
    {name: "王五", age: 28},
    {name: "赵六", age: 5}
];
arr.sort(function (a, b) {
    if (a.age < b.age) {
        return -1;
    } else if (a.age > b.age) {
        return 1;
    }
    return 0;
});
console.log(arr);
// [
//     {name: "赵六", age: 5},
//     {name: "李四", age: 16},
//     {name: "张三", age: 18},
//     {name: "王五", age: 28}
// ]

