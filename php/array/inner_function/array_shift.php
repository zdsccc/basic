<?php

$stack = array("orange","banana","apple","raspberry");
$fruit = array_shift($stack);
// 将数组的第一个单元移出并作为结果返回
// 将数据的长度减一并将所有其他单元向前移动一位
var_dump($fruit);
// 所有的数字键名将改为从0开始计数，文字键名将不变
var_dump($stack);
