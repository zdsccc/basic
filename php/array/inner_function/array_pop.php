<?php

$stack = array("orange","banana","apple","raspberry");
$fruit = array_pop($stack);
// 将数组的最后一个单元移出并作为结果返回
// 将数据的长度减一，并重置指针到数组首位
// string(9) "raspberry"
var_dump($fruit);

/*
array(3) {
  [0]=>
  string(6) "orange"
  [1]=>
  string(6) "banana"
  [2]=>
  string(5) "apple"
}
*/

var_dump($stack);