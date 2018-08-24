function friendlyDate (time) {
    var interval = Date.now() - time;
    switch(true) {
        case interval < 0 :
            console.log('在未来');
            break;
        // 距当前时间不到1分钟时间间隔
        case interval >= 0 && interval < (60 * 1000) :
            console.log('刚刚');
            break;
        // 距当前时间大于等于1分钟，小于1小时
        case interval >= (60 * 1000) && interval < (60 * 60 * 1000) :
            console.log('3分钟前');
            break;
        // 距离当前时间大于等于1小时，小于24小时
        case interval >= (60 * 60 * 1000) && interval < (24 * 60 * 60 * 1000) :
            console.log('8小时前');
            break;
        // 距离当前时间大于等于24小时，小于30天
        case interval >= (24 * 60 * 60 * 1000) && interval < (30 * 24 * 60 * 60 * 1000) :
            console.log('3天前');
            break;
        // 距离当前时间大于等于30天小于12个月
        case interval >= (30 * 24 * 60 * 60 * 1000) && interval < (12 * 30 * 24 * 60 * 60 * 1000) :
            console.log('2个月前');
            break;
        // 距离当前时间大于等于12个月
        case interval >= (12 * 30 * 24 * 60 * 60 * 1000) :
            console.log('8年前');
            break;
    }
}
console.log(Date.now());// 1534902339867
friendlyDate('1504513587883');// 2个月前



