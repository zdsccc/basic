<?php
$arr = array(
    array("id"=>"aa","goods_name"=>"test1","desc"=>"jhkjl"),
    array("id"=>"aa","goods_name"=>"test2","desc"=>"dd"),
    array("id"=>"bb","goods_name"=>"test3","desc"=>"ghj")
);
echo "<pre>";
$left = $right = array();
foreach ($arr as $k => $v) {
    $left[$v["id"]] = array(
        "id" => $v["id"]
    );
    $right[$v["id"]]["goods"][] = array(
        "goods_name" => $v["goods_name"],
        "desc" => $v["desc"]
    );
}
var_dump($left);
var_dump($right);
array_walk($left, function(&$v, $k, $right){
    $v["goods"] = $right[$k]["goods"];
}, $right);
var_dump($left);

