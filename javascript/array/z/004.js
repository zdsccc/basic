var arr = [2, 33, 444, 5555];

// 标准写法
console.log("=== 标准写法 ===");
var l = arr.length;
for (var a = 0; a < l; a++)
{
    console.log(arr[a]);
}

// 变异写法 1
console.log("=== 变异写法 1 ===");
for (var b = 0, m = arr.length; b < m; b++)
{
    console.log(arr[b]);
}

// 变异写法 2
console.log("=== 变异写法 2 ===");
var c = 0, n = arr.length;
for (; c < n; c++)
{
    console.log(arr[c]);
}

// 不推荐写法
console.log("=== 不推荐写法 ===");
for (var j = 0; j < arr.length; j++)
{
    console.log(arr[j]);
}

// 优化写法，节省了一个变量
console.log("=== 优化写法 ===");
for (var k = arr.length - 1; k >= 0; k--)
{
    console.log(arr[k]);
}

