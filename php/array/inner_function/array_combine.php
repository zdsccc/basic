<?php
/**
 * Created by PhpStorm.
 * User: hiyesman
 * Date: 2018/4/14
 * Time: 10:37
 */

//1、二维数组不可直接使用该函数
//2、keys数组和values数组参数数量必须相等
header("Content-type:text/html;charset=UTF-8");
$keys   = array("张","振","");
$values = array(1,2,3);
$arr    = array_combine($keys,$values);
echo "<pre>";
var_dump($arr);
/**
array(3) {
["张"]=>
int(1)
["振"]=>
int(2)
[""]=>
int(3)
}
 */
echo $arr[""];
// 3
