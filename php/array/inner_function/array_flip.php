<?php
// 数组去重复值
$trans      =   array('a'=>1, 'b'=>1, 'c'=>2);
$f_trans    =   array_flip($trans);
print_r($f_trans);
/*
Array
(
    [1] => b
    [2] => c
)
*/
$ff_trans=array_flip($f_trans);
print_r($ff_trans);
/*
Array
(
    [b] => 1
    [c] => 2
)
*/