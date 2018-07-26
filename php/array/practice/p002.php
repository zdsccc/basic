<?php
/**
 * Created by PhpStorm.
 * User: yesman
 * Date: 2018/7/18
 * Time: 10:19
 */

$arr = array(
    array("name"=>"yesman","age"=>28,"desc"=>"hello"),
    array("name"=>"gavin","age"=>29,"desc"=>"baga")
);

// $arr= 这是很容易忘掉的
$arr = array_map(function($v) {
    $v["test"] = "test";
    return $v;
},$arr);

echo "<pre>";
var_dump($arr);
