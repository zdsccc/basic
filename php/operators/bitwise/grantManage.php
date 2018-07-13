<?php
// 定义权限
$create = 1;// 0001
$update = 2;// 0010
$read   = 4;// 0100
$delete = 8;// 1000
$all    = $create
        | $update
        | $read
        | $delete;// 1111
// 定义用户组权限
$admin = $all;// 1111
$guest = $create | $read;// 0101
$user  = $all & ~$delete;// 0111

// 判断是否具有某个权限，利用与运算符的规则
var_dump($admin & $create);// int(1) === 0001 === 有
var_dump($admin & $update);// int(2) === 0010 === 有
var_dump($admin & $read);  // int(4) === 0100 === 有
var_dump($admin & $delete);// int(8) === 1000 === 有
echo "<hr />";
var_dump($guest & $create);// int(1) === 0001 === 有
var_dump($guest & $update);// int(0) === 0000 === 无
var_dump($guest & $read);  // int(4) === 0100 === 有
var_dump($guest & $delete);// int(0) === 0000 === 无
echo "<hr />";
var_dump($user & $create);// int(1) === 0001 === 有
var_dump($user & $update);// int(2) === 0010 === 有
var_dump($user & $read);  // int(4) === 0100 === 有
var_dump($user & $delete);// int(0) === 0000 === 无


