<?php
header("content-type:text/html;charset=UTF-8");

$ms_office = array(
    'word',
    'excel',
    'outlook',
    'ac' => 'access',
    'vs' => 'visio'
);

// ---------------------------------------------------------
// string 作为needle
// 如果 needle 是字符串，则比较是区分大小写的。
$tmp_lower  = "excel";
$tmp_higher = "Excel";

// 变量后一定要加空格(或其他变量命名外的字符)隔断，否则解析错误
// 因为中文也可以做变量名
echo in_array($tmp_lower, $ms_office)
        ? "$tmp_lower 在数组\$ms_office中。<br />"
        : "$tmp_lower 不在数组\$ms_office中。<br />";

// 也可以使用{}进行隔断
echo in_array($tmp_higher, $ms_office)
        ? "{$tmp_higher}在数组\$ms_office中。<br />"
        : "{$tmp_higher}不在数组\$ms_office中。<br />";
/*
输出结果：
excel 在数组$ms_office中。
Excel 不在数组$ms_office中。
从执行结果看，in_array()对于字符串是区分大小写的。
*/

// ---------------------------------------------------------
// 数组作为needle
$arr_a = array(
    array('a', 'b'),
    1,
    2
);
$arr_b = array('a', 'b');
// bool(true)
var_dump(in_array($arr_b, $arr_a));

// ---------------------------------------------------------
// 加第三个参数strict
$arr_c = array(
    "a",
    "b",
    "c",
    1
);
// bool(false)
var_dump(in_array("1", $arr_c, true));
