var arr = new Array(10);
console.log(arr);// [empty × 10]
// 必须用String，而不是string
console.log(String(arr));// ,,,,,,,,,

console.log(arr.join());// ,,,,,,,,,
console.log(arr.join(""));//

