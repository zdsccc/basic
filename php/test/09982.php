<?php
/**
 * Created by PhpStorm.
 * User: yesman
 * Date: 2018/5/16
 * Time: 13:27
 */

/**
 * 计算字符串的长度（汉字按照两个字符计算）
 *
 * @param   string      $str        字符串
 *
 * @return  int
 */
function str_len($str)
{
    $length = strlen(preg_replace('/[\x00-\x7F]/', '', $str));

    if ($length)
    {
        return strlen($str) - $length + intval($length / 3) * 2;
    }
    else
    {
        return strlen($str);
    }
}

// 33
echo str_len("women都有一个家mingzijiaozhongguo");

