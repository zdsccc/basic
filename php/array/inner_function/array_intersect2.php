<?php

$arr1 = array(true,'2');
$arr2 = array('1','2');
$arr3 = array(1,'2');

// 两个单元仅在 (string) $elem1 === (string) $elem2 时被认为是相同的。也就是说，当字符串的表达是一样的时候。
$arr12  = array_intersect($arr1,$arr2);
$arr13  = array_intersect($arr1,$arr3);

echo "<pre>";
var_dump($arr12);
/*
array(2) {
  [0]=>
  bool(true)
  [1]=>
  string(1) "2"
}
*/

var_dump($arr13);
/*
array(2) {
  [0]=>
  bool(true)
  [1]=>
  string(1) "2"
}
*/