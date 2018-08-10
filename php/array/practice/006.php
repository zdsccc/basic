<?php

$arr = array(
  'a' => 'aaa',
  'b' => 'bbb',
  'c' => 'ccc',
  'd' => 'ddd',
);

// 将数组的内部元素指向最后一个单元，并返回其值
end($arr);

// 最后一个元素的值
var_dump(current($arr));

// 最后一个元素的键
var_dump(key($arr));

