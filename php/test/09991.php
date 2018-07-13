<?php
/**
 * Created by PhpStorm.
 * User: yesman
 * Date: 2018/5/9
 * Time: 11:34
 */

$arr = array(
    'k1'=>'v1',
    'k2'=>'v2'
);

foreach ($arr as $k=>$v) {
    $data1 = array();
    $data1[] = $v;
    $data[] = $data1;
}

echo "<pre>";
var_dump($data);
