<?php
$arr1 = array (
    0 => 'ling'
);
$arr2 = array (
    '0' => 'ling'
);
$arr3 = array (
    false => 'ling'
);
$arr12 = array_intersect_assoc($arr1, $arr2);

echo "<pre>";
var_dump($arr12);
/*
array(1) {
  [0]=>
  string(4) "ling"
}
*/
$arr13 = array_intersect_assoc($arr1, $arr3);

echo "<pre>";
var_dump($arr13);
/*
array(1) {
  [0]=>
  string(4) "ling"
}
*/
$arr23 = array_intersect_assoc($arr2, $arr3);

echo "<pre>";
var_dump($arr23);
/*
array(1) {
  [0]=>
  string(4) "ling"
}
*/