// localeCompare排序
var arr = [
    ['中'],
    ['啊'],
    ['哦'],
    ['a中'],
    ['a国'],
    ['z中'],
    ['z国'],
    ['A中'],
    ['A国']
];
arr.sort(function(x, y){
    return x[0].localeCompare(y[0]);
});
console.log(arr);


