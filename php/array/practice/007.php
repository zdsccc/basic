<?php
header("Content-type:text/html;charset=UTF-8");
// 关联数组 指定key 之前插入元素
$insert_array = array(
    "雅" => "哑"
);
$assoc_array = array(
    "微" => "痿",
    "软" => "软",
    "黑" => "黑",
);
function array_push_before_particular_key ($array, $data = null, $key = false)
{
    $data = (array)$data;
    $offset = ($key === false)
        ? false
        : array_search($key, array_keys($array));
    $offset = ($offset) ? $offset : false;
    if ($offset) {
        return array_merge(
            array_slice($array, 0, $offset),
            $data,
            array_slice($array, $offset)
        );
    } else {
        return array_merge($array, $data);
    }
}

echo "<pre>";
var_dump(array_push_before_particular_key($assoc_array, $insert_array, "黑"));



