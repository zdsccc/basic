function format (num) {
    return (num.toFixed(2) + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
}
var num = 9999.9999;
console.log(format(num));// 10,000.00


