<?php

$arr = array(
    0 => 'a',
    1 => 'b',
    2 => 'c',
    3 => 'a'
);

$key = array_search('a',$arr);

// 由于索引数组的起始索引数字可能是 0 ，因此该函数也可能返回与 FALSE 等值的非布尔值，例如 0 或者 ""，所以需要使用 === 运算符对函数返回的值进行严格校验。
// 输出：first key is: 0
if ($key !== false) {
    echo "first key is: " . $key;
} else {
    echo "no result.";
}

echo "<br />";

// 问题：键3对应的值也是'a'，array_search只返回搜索到的第一个元素的键值或false
// 要找到键3，怎么办？
// 使用array_keys函数

$keys = array_keys($arr,'a');
echo "<pre>";
var_dump($keys);
/*
array(2) {
  [0]=>
  int(0)
  [1]=>
  int(3)
}
*/
