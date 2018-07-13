<?php
/**
 * Created by PhpStorm.
 * User: yesman
 * Date: 2018/5/17
 * Time: 11:31
 */

// 标准对象的遍历

// 展示的都是公共属性，私有属性的生产方法？？？
// 先做公共函数
// 函数指定创建私有属性的方法

$stdClass = new stdClass();
$stdClass->username = "xiaoming";
$stdClass->password = "henshuai";

foreach ($stdClass as $k => $v)
{
    echo $k, " => ", $v, "<br />";
}
