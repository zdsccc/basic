var arr = [
    [1, 2, 3],
    [7, 2, 3],
    [3, 2, 3]
];
arr.sort(function (x, y) {
    return x[0] - y[0];
});
console.log(arr);
/*
[
    [1, 2, 3],
    [3, 2, 3],
    [7, 2, 3]
]
 */
