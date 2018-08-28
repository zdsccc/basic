var now = new Date();
console.log(typeof(now + 1)); // string，将日期转换为字符串（字符串的拼接）
console.log(typeof(now - 1)); // number，使用对象到数字的转换
console.log(now == now.toString()); //true，隐式和显式的字符串转换
console.log(now > (now - 1)); // true，将日期转换为数字（隐式）


