<?php
/**
 * Created by PhpStorm.
 * User: yesman
 * Date: 2018/6/20
 * Time: 8:40
 */

echo "<pre>";

$arr = array(
    "id" => 1,
    "name" => "zhangsan"
);
var_dump(json_encode($arr));
/**
 * return
 *
 * string(26) "{"id":1,"name":"zhangsan"}"
 */

$data = "输出json数据";
var_dump(json_encode($data));
/**
 * return
 * string(30) ""\u8f93\u51fajson\u6570\u636e""
 */
$newdata = iconv('UTF-8','GBK',$data);
// 返回空
var_dump(json_encode($newdata));
/**
 * 5.4.0 这个版本起，字符非法时候会返回 FALSE
 * return
 * bool(false)
 */