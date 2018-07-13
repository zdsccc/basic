<?php
$arr = array (
    'a' => 'A',
    'b' => 'B',
    'c' => 'C',
    'd' => 'D'
);
$arr1 = array_rand($arr, 2);
echo "<pre>";
print_r($arr1);
// 打印结果显示：
// Array ( [0] => c [1] => d )
// 每次刷新显示的结果都不一样
// Array ( [0] => a [1] => c )
