<?php

$arr1 = array('a','b','c','d');
$arr2 = array('a','b','e');
$arr3 = array('a','d','f');

// 只比较键值
$arr = array_intersect($arr1,$arr2,$arr3);

echo "<pre>";
var_dump($arr);
/*
array(1) {
  [0]=>
  string(1) "a"
}
*/