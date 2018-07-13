<?php
/**
 * Created by PhpStorm.
 * User: yesman
 * Date: 2018/4/28
 * Time: 11:32
 */

$arr = array (
    'cid' =>  1315,
    'cid2' =>  1342,
    'cid2Name' =>  '男装',
    'cid3' =>  1349,
    'cid3Name' =>  'T恤',
    'cidName' =>  '服饰内衣',
    'commisionRatioPc' =>  70,
    'commisionRatioWl' =>  70,
    'endDate' =>  32472115200000,
    'goodsName' =>  "【买'一'送一，39包邮】青年长袖T恤男韩版秋衣男士外穿小衫上衣服男装打底衫丅 翠花白色+胸前条纹白色长袖 S",
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
);
echo "<pre>";
$result = array_map('add_slashes',$arr);

function add_slashes ($v) {
    if (is_string($v)) {
        echo $v;
        return addslashes($v);
    }
}

var_dump($result);