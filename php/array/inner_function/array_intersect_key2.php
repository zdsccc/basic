<?php
header("Content-type:text/html;charset=UTF-8");

$arr1 = array(
    0 => 'yi',
    2 => 'er'
);
$arr2 = array(
    '0' => '一',
    2   => '二'
);
$arr3 = array(
    false => '一',
    2     => '二'
);
$arr4 = array(
    ''=> '一',
    2 => '二'
);

// 在 key => value 对中的两个键名仅在 (string) $key1 === (string) $key2  时被认为相等。换句话说，执行的是严格类型检查，因此字符串的表达必须完全一样。
$arr12 = array_intersect_key($arr1,$arr2);

echo "<pre>";
var_dump($arr12);
/*
array(2) {
  [0]=>
  string(2) "yi"
  [2]=>
  string(2) "er"
}
*/

// 在 key => value 对中的两个键名仅在 (string) $key1 === (string) $key2  时被认为相等。换句话说，执行的是严格类型检查，因此字符串的表达必须完全一样。
$arr13 = array_intersect_key($arr1,$arr3);

echo "<pre>";
var_dump($arr13);
/*
array(2) {
  [0]=>
  string(2) "yi"
  [2]=>
  string(2) "er"
}
*/

// 在 key => value 对中的两个键名仅在 (string) $key1 === (string) $key2  时被认为相等。换句话说，执行的是严格类型检查，因此字符串的表达必须完全一样。
$arr23 = array_intersect_key($arr2,$arr3);

echo "<pre>";
var_dump($arr23);
/*
array(2) {
  [0]=>
  string(2) "yi"
  [2]=>
  string(2) "er"
}
*/

// 在 key => value 对中的两个键名仅在 (string) $key1 === (string) $key2  时被认为相等。换句话说，执行的是严格类型检查，因此字符串的表达必须完全一样。
$arr34 = array_intersect_key($arr3,$arr4);

echo "<pre>";
var_dump($arr34);
/*
array(1) {
  [2]=>
  string(3) "二"
}
*/

// 对于严格数据检查
// (string) false === '' 为 true
// 但是为什么23有公共键名，但34没有呢？

var_dump($arr3);
// 说明boolean类型的false键名，在数组索引中实际为0
/*
array(2) {
  [0]=>
  string(3) "一"
  [2]=>
  string(3) "二"
}
*/