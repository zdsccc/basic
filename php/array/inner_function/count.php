<?php

// 如果 var 是非数组的普通变量，则返回 1 ，对于不存在、未初始化或空数组返回 0 。

// 输出：
// Notice: Undefined variable: x in D:\git\github\basicPHP\array\inner_function\count.php on line 8
// 0
echo count($x),"<br />";

// 输出：0
echo count(array()),"<br />";

// 输出：1
$a = 2;
echo count($a),"<br />";

// 输出：3
$arr_age = array(18, 20, 25);
echo count($arr_age),"<br />";
