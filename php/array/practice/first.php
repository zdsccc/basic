<?php
$array = array(
	"one"	=> "yi",
	"two"	=> "er",
	"three"	=> "san"
);

// 将数组内部指针指向第一个元素，如果确定，可以不使用该语句
reset($array);

// 第一个元素的值
$first_value = current($array);

// 第一个元素的键
$first_key   = key($array);

// string(2) "yi"
var_dump($first_value);

// string(3) "one"
var_dump($first_key);
