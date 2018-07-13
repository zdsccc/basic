<?php

$arr1 = array(1=>'yi',2=>'er');
$arr2 = array('1'=>'一',2=>'二');
$arr3 = array(true=>'一',2=>'二');

// 在 key => value 对中的两个键名仅在 (string) $key1 === (string) $key2  时被认为相等。换句话说，执行的是严格类型检查，因此字符串的表达必须完全一样。
$arr12 = array_intersect_key($arr1,$arr2);

echo "<pre>";
var_dump($arr12);
/*
array(2) {
  [1]=>
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
  [1]=>
  string(2) "yi"
  [2]=>
  string(2) "er"
}
*/
