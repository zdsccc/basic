// 二维数组

// 初始化-1
function init1() {
    var arr = [[1,2],['a','b']];
    // a 第2列第1行所在的元素
    console.log(arr[1][0]);
}

// 初始化-2
function init2() {
    var arr = new Array(new Array(1, 2), new Array("a", "b"));
    console.log(arr[1][0]);
}
// 初始化-3
function init3() {
    var arr = new Array();          // 先声明一维
    for (var i = 0; i < 5; i++) {   // 一维长度为5
        arr[i] = new Array(i);      // 在声明二维
        for (var j = 0; j < 5; j++) {// 二维长度为5
            arr[i][j] = i;
        }
    }
    console.log(arr);
}
init1();// a
init2();// a
init3();
/*
* [[0,0,0,0,0],[1,1,1,1,1],[2,2,2,2,2],[3,3,3,3,3],[4,4,4,4,4]]
*/