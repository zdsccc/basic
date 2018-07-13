<?php
$arr1 = array('one'=>'c','one'=>'b');
$arr2 = array('three'=>'3','one'=>'2');

$arr = array_merge_recursive($arr1,$arr2);

echo "<pre>";
var_dump($arr);
/*
array(2) {
  ["one"]=>
  array(2) {
    [0]=>
    string(1) "b"
    [1]=>
    string(1) "2"
  }
  ["three"]=>
  string(1) "3"
}
 */