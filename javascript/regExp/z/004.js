var reg = /^s/;
console.log(reg.test('Java\nscript'));// false

var reg_m = /^s/m;
console.log(reg_m.test('Java\nscript'));// true

