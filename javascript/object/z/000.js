var counterArray = {
    A : 3,
    B : 4
};
counterArray["C"] = 1;
// 其实答案很简单，直接计算key的数量就可以了。
console.log(Object.keys(counterArray).length);// 3



