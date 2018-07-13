<?php
/**
 * Created by PhpStorm.
 * User: yesman
 * Date: 2018/5/3
 * Time: 11:34
 */

// weixin jssdk
// 创建16位随机字符串
function createNonceStr($length = 16) {
    $chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    $str = "";
    for ($i = 0; $i < $length; $i++) {
        $str .= substr($chars, mt_rand(0, strlen($chars) - 1), 1);
    }
    return $str;
}
echo createNonceStr();


