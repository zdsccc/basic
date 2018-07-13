<?php

$arr = array(15, 20, 6);

echo "<pre>";
// 如果pad_size>0，那么被填充的数组元素从input数组的末尾开始。
$result = array_pad($arr, 6, -1);
var_dump($result);
/*
array(6) {
  [0]=>
  int(15)
  [1]=>
  int(20)
  [2]=>
  int(6)
  [3]=>
  int(-1)
  [4]=>
  int(-1)
  [5]=>
  int(-1)
}
*/

// 如果为负值，那么就从input数组的开始位置填充。
$result = array_pad($arr, -6, -1);
var_dump($result);
/*
array(6) {
  [0]=>
  int(-1)
  [1]=>
  int(-1)
  [2]=>
  int(-1)
  [3]=>
  int(15)
  [4]=>
  int(20)
  [5]=>
  int(6)
}
*/

// 如果pad_size 小于数组原有长度，那么不进行填充。
$result = array_pad($arr, 2, -1);
var_dump($result);
/*
array(3) {
  [0]=>
  int(15)
  [1]=>
  int(20)
  [2]=>
  int(6)
}
*/
