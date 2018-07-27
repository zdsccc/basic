console.log("this file start");

var price_ladder = [
    {amount: 2, price: 80},
    {amount: 5, price: 70}
];
Array.prototype.in_array = function(e)
{
    for(i=0;i<this.length;i++)
    {
        if(this[i] == e)
            return true;
    }
    return false;
}
function getLadderPrice(price_ladder, goods_num) {
    // return price_ladder[0].price;
    var amount = new Array();
    var len = price_ladder.length;
    if (len == 0) {
        return 0;
    }
    for (var i = 0; i < len; i++) {
        amount.push(price_ladder[i].amount);
    }
    var ladder_amount;
    if (amount.in_array(goods_num)) {
        ladder_amount = goods_num;
    } else {
        amount.push(goods_num);
        // return amount;
        amount.sort(function (num1, num2) {
            return num1 - num2;
        });
        // return amount;
        for (var j = 0; j < len + 1; j++) {
            if (amount[j] == goods_num) {
                ladder_amount = amount[j + 1] ? amount[j + 1] : amount[j - 1];
            }
        }
    }
    for (var k = 0; k < len + 1; k++) {
        if (price_ladder[k].amount == ladder_amount) {
            return price_ladder[k].price;
        }
    }
}
console.log(getLadderPrice(price_ladder, 1));
console.log(getLadderPrice(price_ladder, 2));
console.log(getLadderPrice(price_ladder, 3));
console.log(getLadderPrice(price_ladder, 4));
console.log(getLadderPrice(price_ladder, 5));
console.log(getLadderPrice(price_ladder, 6));
console.log(getLadderPrice(price_ladder, 10));

console.log("this file end");

