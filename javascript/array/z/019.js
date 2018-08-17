var arr = [1, 2, 3, 4, 5];
arr.sort(function(){
    return Math.random() - 0.5;// Math.random()--->[0,1);
});
console.log(arr);

