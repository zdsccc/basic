// 自记忆素数检测函数
function isPrime (value) {
    // 创建缓存
    if (!isPrime.answers) {
        isPrime.answers = {};
    }
    // 检查缓存的值
    if (isPrime.answers[value] !== undefined) {
        return isPrime.answers[value];
    }
    console.log("计算");
    // 0和1不是素数
    var prime = value !== 0 && value !== 1;
    // 检查是否为素数
    for (var i = 2; i < value; i++) {
        if (value % i === 0) {
            prime = false;
            break;
        }
    }
    // 存储计算值
    return isPrime.answers[value] = prime
}
console.log(isPrime(1));
console.log(isPrime(2));
console.log(isPrime(3));
console.log(isPrime(1));
console.log(isPrime(3));

/*
 * 计算
 * false
 * 计算
 * true
 * 计算
 * true
 * false
 * true
 */
