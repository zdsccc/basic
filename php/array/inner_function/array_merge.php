<?php
header("Content-type:text/html;charset=UTF-8");
$arr1 = array("百度","阿里","腾讯");
$arr2 = array("zhihu","weibo");
$data = array_merge($arr1,$arr2);
echo "<pre>";
var_dump($data);
/**
array(5) {
[0]=>
string(6) "百度"
[1]=>
string(6) "阿里"
[2]=>
string(6) "腾讯"
[3]=>
string(5) "zhihu"
[4]=>
string(5) "weibo"
}
 */
