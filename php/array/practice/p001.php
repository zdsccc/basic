<?php
/**
 * Created by PhpStorm.
 * User: yesman
 * Date: 2018/7/18
 * Time: 8:59
 */

$arr = array(
    array("name"=>"yesman","age"=>28,"desc"=>"hello"),
    array("name"=>"gavin","age"=>29,"desc"=>"baga")
);

// 必须加&，寻址方式修改
foreach ($arr as $k=>&$v) {
    $v["desc"] .= "world";
}

echo "<pre>";
var_dump($arr);
