<?php
$arr1 = array (
    1 => 'yi'
);
$arr2 = array (
    '1' => 'yi'
);
$arr3 = array (
    true => 'yi'
);
$arr12 = array_intersect_assoc($arr1, $arr2);

echo "<pre>";
var_dump($arr12);
/*
array(1) {
  [1]=>
  string(2) "yi"
}
*/
$arr13 = array_intersect_assoc($arr1, $arr3);

echo "<pre>";
var_dump($arr13);
/*
array(1) {
  [1]=>
  string(2) "yi"
}
*/
$arr23 = array_intersect_assoc($arr2, $arr3);

echo "<pre>";
var_dump($arr23);
/*
array(1) {
  [1]=>
  string(2) "yi"
}
*/