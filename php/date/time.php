<?php
/**
 * Created by PhpStorm.
 * User: yesman
 * Date: 2018/5/29
 * Time: 11:40
 */

//echo time();
//echo microtime(), "<br />";
/*
 *
 *返回字符串的毫秒数时间戳
 */
function get_total_millisecond()
{
    $time = explode (" ", microtime () );
    // 不强制转换，可能出现的情况：076变成76
    // 最后输出12位而非13位时间戳
    $time = $time [1] . (string)($time [0] * 1000);
    $time2 = explode ( ".", $time );
    $time = $time2 [0];
    return $time;
}
// 0.06612400 1527565423
// msec sec
echo get_total_millisecond();

