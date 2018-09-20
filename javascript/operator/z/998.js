var num = 10;
if(num > 5 && num <= 10){
    num++;
    console.log(num);
}

// 改写方法
// 多条语句中间用逗号分隔
num = 10;
(num > 5 && num <= 10) ? (num++, console.log(num)) : null;

Uncaught TypeError: Cannot read property '3' of undefined
