<?php
function is_json($string) {
    json_decode($string);
    return (json_last_error() == JSON_ERROR_NONE);
}

$str = '[{"product_theme":"jyg","product_id":"152152"},{"product_theme":"jyg","product_id":"152152"},{"product_theme":"jyg","product_id":"152152"},20]';

echo "<pre>";

if (!is_json($str)) {
    exit(0);
}
$arr = json_decode($str, true);
var_dump($arr);
$flag = array_pop($arr);

if (!is_integer($flag) || $flag < 1 || $flag > 9) {
    $flag = 1;
}

$values = "";

foreach ($arr as $k=>$v) {
    $values .= "('{$v['product_theme']}','{$v['product_id']}',$flag),";
}

echo $values;
