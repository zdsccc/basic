<?php
/**
 * Created by PhpStorm.
 * User: hiyesman
 * Date: 2018/4/26
 * Time: 22:00
 */

include "./encode.php";

$id = isset($_GET['id'])
        ? $_GET['id']
        : "";
$key = isset($_GET['key'])
    ? $_GET['key']
    : "";

if (0 === strlen($id) || 32 !== strlen($key)) {
    exit("wrong parameters");
}

if (keymaker($id) !== $key) {
    exit("attack");
}

echo "normal access";