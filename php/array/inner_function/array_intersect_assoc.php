<?php
$arr1 = array (
    'a'=>'A',
    'b'=>'B',
    'c'=>'C',
    'd'=>'D'
);
$arr2 = array (
    'a'=>'A',
    'c'=>'B',
    'E'
);
$arr3 = array (
    'a'=>'A',
    'b'=>'F',
    'd'=>'B'
);

// 计算数组的交集，既比较键，也比较键值。
$arr  = array_intersect_assoc($arr1, $arr2, $arr3);

echo "<pre>";
var_dump($arr);
/*
array(1) {
  ["a"]=>
  string(1) "A"
}
*/