<?php
header("Content-type:text/html;charset=UTF-8");
$promos_group_buy  = '[{"act_id":4,"act_name":"\u91d1\u76cf\u82b1\u6e05\u6da6\u4fdd\u6e7f\u4e73(150ml) \u83f2\u8bd7\u5c0f\u94fa\uff08The Face Shop\uff09\uff08\u4e73\u6db2\u9762\u971c \u8212\u7f13\u4fdd\u6e7f \u4fdd\u6e7f\u4e73\u6db2 \u7f8e\u767d \u5e73\u8861\u6c34\u6cb9\uff09","act_desc":"","act_type":1,"goods_id":20,"product_id":0,"goods_name":"\u91d1\u76cf\u82b1\u6e05\u6da6\u4fdd\u6e7f\u4e73(150ml) \u83f2\u8bd7\u5c0f\u94fa\uff08The Face Shop\uff09\uff08\u4e73\u6db2\u9762\u971c \u8212\u7f13\u4fdd\u6e7f \u4fdd\u6e7f\u4e73\u6db2 \u7f8e\u767d \u5e73\u8861\u6c34\u6cb9\uff09","start_time":1531411200,"end_time":1532707200,"is_finished":0,"ext_info":"a:4:{s:12:\"price_ladder\";a:1:{i:0;a:2:{s:6:\"amount\";i:2;s:5:\"price\";d:130;}}s:15:\"restrict_amount\";i:55;s:13:\"gift_integral\";i:0;s:7:\"deposit\";d:70;}"}]';
$promos_favourable = '[{"promo":"\u6ee199.00\u51cf10.00","name":"\u6ee199\u51cf10","start_at":1527609600,"end_at":1535644800,"type":"favourable"},{"promo":"\u6ee1199.00\u51cf20.00","name":"\u6ee1199\u51cf20","start_at":1527609600,"end_at":1535644800,"type":"favourable"},{"promo":"\u6ee1399.00\u51cf50.00","name":"\u6ee1399\u51cf50","start_at":1527609600,"end_at":1535644800,"type":"favourable"},{"promo":"\u6ee1699.00\u51cf90.00","name":"\u6ee1699\u51cf90","start_at":1527609600,"end_at":1535644800,"type":"favourable"}]';
echo "<pre>";
var_dump(json_decode($promos_group_buy,true));
echo json_last_error_msg(),"<br />";
var_dump(json_decode($promos_favourable,true));
var_dump(array_merge(json_decode($promos_group_buy,true),json_decode($promos_favourable,true)));

echo "<hr />";
$arr1 = array("百度","阿里","腾讯");
$arr2 = array("zhihu","weibo");
$data = array_merge($arr1,$arr2);
var_dump($data);
/**
array(5) {
[0]=>
string(6) "百度"
[1]=>
string(6) "阿里"
[2]=>
string(6) "腾讯"
[3]=>
string(5) "zhihu"
[4]=>
string(5) "weibo"
}
 */
