<?php
/**
 * Created by PhpStorm.
 * User: hiyesman
 * Date: 2018/4/26
 * Time: 22:00
 */

function keymaker ($id) {
    $secretkey = "abcdefg";
    $key = md5 ($id . $secretkey);
    return $key;
}
