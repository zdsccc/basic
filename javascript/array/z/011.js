var a = ['Wind', 'Rain', 'Fire'];
var myVar1 = a.join();
console.log(myVar1);// Wind,Rain,Fire
var myVar2 = a.join(', ');
console.log(myVar2);// Wind, Rain, Fire
var myVar3 = a.join(' + ');
console.log(myVar3);// Wind + Rain + Fire
var myVar4 = a.join('');
console.log(myVar4);// WindRainFire

// 对{}调用toString()方法
var myVar5 = a.join({});
console.log(myVar5);// Wind[object Object]Rain[object Object]Fire

