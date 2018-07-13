<?php

$a = "9D9";
$b = ++$a;

// string(3) "9E0"
var_dump($b);

// 9E0 = 9 * 10^0 = 9
// float(10)
var_dump(++$b);

