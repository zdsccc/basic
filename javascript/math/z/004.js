function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

console.log(getRandomArbitrary(1.5, 6.5));// 4.441445339111725
console.log(getRandomArbitrary(1.5, 6.5));// 4.0147699180856975
console.log(getRandomArbitrary(1.5, 6.5));// 2.5715727010355867

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

console.log(getRandomInt(1, 6));// 4
console.log(getRandomInt(1, 6));// 1
console.log(getRandomInt(1, 6));// 5

function random_str (length) {
    var ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    ALPHABET += 'abcdefghijklmnopqrstuvwxyz';
    ALPHABET += '0123456789-_';
    var str = '';
    for (var i = 0; i < length; ++i) {
        var rand = Math.floor(Math.random() * ALPHABET.length);
        str += ALPHABET.substring(rand, rand + 1);
    }
    return str;
}

console.log(random_str(6));// u8C_AS
console.log(random_str(6));// 8blZas
console.log(random_str(6));// nfpwbG

