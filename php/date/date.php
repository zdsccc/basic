<?php
/**
 * Created by PhpStorm.
 * User: yesman
 * Date: 2018/5/8
 * Time: 15:45
 */

$chuochuochuo    = '32472115200000';
$chuochuochuo_10 = $chuochuochuo / 1000;
//echo $chuochuochuo_10;
//echo "<br />";
//echo date("Y-m-d H:i:s");

//$date = new DateTime();
//echo $date->format('U = Y-m-d H:i:s') . "\n";
//
//$date->setTimestamp($chuochuochuo/1000);
//echo $date->format('U = Y-m-d H:i:s') . "\n";

// 万恶的32位，万恶的20382038203820382038

// 2、时间戳转换为日期字符串
$obj = new DateTime("@32472115200"); // 这里时间戳前要写一个@符号
echo "<pre>";
var_dump($obj);
$timezone = timezone_open('Asia/HONG_KONG'); // 设置时区
$obj->setTimezone($timezone);
echo $obj->format("Y-m-d H:i:s"); // 2050-12-31 23:59:59

