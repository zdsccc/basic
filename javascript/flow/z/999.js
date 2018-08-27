// var num = 0;
// for (var i = 1; i < 10; i++) {
//     if (i % 5 == 0) {
//         break;
//         // continue;
//     }
//     num++;
// }
// console.log(num);// 4

var num = 0;
outermost:
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            if (i == 5 && j == 5) {
                continue outermost;
            }
            num++;
        }
    }
console.log(num);// 95

