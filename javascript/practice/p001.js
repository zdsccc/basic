var price_ladder = [
    {amount: 2, price: 72},
    {amount: 5, price: 70}
];

console.log(price_ladder[0].price);

var now_amount = 6;
var volume_price = 0;

for (var index in price_ladder) {
    if (now_amount > price_ladder[index].amount) {
        volume_price = price_ladder[index].price;
    }
}

console.log(volume_price);

