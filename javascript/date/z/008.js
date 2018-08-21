// 前一天、后一天
var curDate = new Date();
// 前一天
var preDate = new Date(curDate.getTime() - 24 * 60 * 60 * 1000);
// 后一天
var nextDate = new Date(curDate.getTime() + 24 * 60 * 60 * 1000);

// Mon Aug 20 2018 13:48:19 GMT+0800 (中国标准时间)
console.log(curDate);
// Sun Aug 19 2018 13:48:19 GMT+0800 (中国标准时间)
console.log(preDate);
// Tue Aug 21 2018 13:48:19 GMT+0800 (中国标准时间)
console.log(nextDate);

// ES 5.1
// Sun Aug 19 2018 13:51:05 GMT+0800 (中国标准时间)
console.log(new Date(Date.now() - 24 * 60 * 60 * 1000));
// Tue Aug 21 2018 13:51:05 GMT+0800 (中国标准时间)
console.log(new Date(Date.now() + 24 * 60 * 60 * 1000));


