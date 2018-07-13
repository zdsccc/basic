<?php
/**
 * Created by PhpStorm.
 * User: yesman
 * Date: 2018/4/28
 * Time: 13:46
 */

$keys = array (
    0 => 'cid',
    1 => 'cid2',
    2 => 'cid2Name',
    3 => 'cid3',
    4 => 'cid3Name',
    5 => 'cidName',
    6 => 'commisionRatioPc',
    7 => 'commisionRatioWl',
    8 => 'endDate',
    9 => 'goodsName',
    10 => 'imgUrl',
    11 => 'inOrderCount',
    12 => 'isFreeFreightRisk',
    13 => 'isFreeShipping',
    14 => 'isJdSale',
    15 => 'isSeckill',
    16 => 'materialUrl',
    17 => 'shopId',
    18 => 'skuId',
    19 => 'startDate',
    20 => 'unitPrice',
    21 => 'vid',
    22 => 'wlUnitPrice',
);

$arr = array (
    0 => array (
        'cid' =>  1315,
        'cid2' =>  1342,
        'cid2Name' =>  '男装',
        'cid3' =>  1349,
        'cid3Name' =>  'T恤',
        'cidName' =>  '服饰内衣',
        'commisionRatioPc' =>  70,
        'commisionRatioWl' =>  70,
        'endDate' =>  32472115200000,
        'goodsName' =>  "【买'一'送\一\，39包邮】青年长袖T恤男韩版秋衣男士外穿小衫上衣服男装打底衫丅 翠花白色+胸前条纹白色长袖 S",
        'imgUrl' =>  'http://img14.360buyimg.com/n1/jfs/t18640/181/1068606684/229048/6cd61da8/5ab7e5f1Ne8e9e509.jpg',
        'inOrderCount' =>  2,
        'isFreeFreightRisk' =>  0,
        'isFreeShipping' =>  0,
        'isJdSale' =>  0,
        'isSeckill' =>  0,
        'materialUrl' =>  'http://item.jd.com/20935966957.html',
        'shopId' =>  726657,
        'skuId' =>  20935966957,
        'startDate' =>  1522598400000,
        'unitPrice' =>  39,
        'vid' =>  726657,
        'wlUnitPrice' =>  39
    ),
    1 => array (
        'cid' =>  1318,
        'cid2' =>  1466,
        'cid2Name' =>  '体育用品',
        'cid3' =>  1697,
        'cid3Name' =>  '足球',
        'cidName' =>  '运动户外',
        'commisionRatioPc' =>  80,
        'commisionRatioWl' =>  80,
        'endDate' =>  1530374400000,
        'goodsName' =>  '克洛斯威足球526成年人学生儿童真皮脚感耐磨贴皮PU机缝5五号训练比赛用球 蓝白色 5号足球',
        'imgUrl' =>  'http://img14.360buyimg.com/n1/jfs/t17203/121/2038753814/153473/91e25b86/5ae14c55Nce3feba9.jpg',
        'inOrderCount' =>  385,
        'isFreeFreightRisk' =>  1,
        'isFreeShipping' =>  1,
        'isJdSale' =>  0,
        'isSeckill' =>  0,
        'materialUrl' =>  'http://item.jd.com/27620256605.html',
        'shopId' =>  191705,
        'skuId' =>  27620256605,
        'startDate' =>  1524240000000,
        'unitPrice' =>  79,
        'vid' =>  191705,
        'wlUnitPrice' =>  79,
        'biubiu'=>999
    )
);
echo "<pre>";
foreach ($arr as &$value) {
    array_walk($value, function(&$v, $k) use (&$value) {
        global $keys;
        if (!in_array($k, $keys)) {
            // echo $k, "<br />";
            unset($value[$k]);
            // var_dump($value);
        } else {
            if (is_string($v)) {
                echo $v,"<br />";
                $v = addslashes($v);
            }
        }
    });
}

//function fetch_element ($val) {
//    return array_flip($val);
//}
//
//$result = array_filter($arr, "fetch_element");
//
//var_dump($result);die;
//
//function add_slashes ($value, $key) {
//    array_walk($value, function($v, $k) use(&$value) {
//        global $keys;
//        if (!in_array($k, $keys)) {
//            unset($value[$k]);
//        }
//    });
//    if (is_string($value)) {
//        // echo $value;
//        return addslashes($value);
//    }
//    return $value;
//}
//
//array_walk_recursive($arr,"add_slashes");
//
var_dump($arr);