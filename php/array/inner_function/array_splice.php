<?php

$arr1 = array("百度","阿里","腾讯");
$arr2 = array("zhihu","weibo");

array_splice($arr1,0,2,$arr2);

echo "<pre>";
var_dump($arr1);
/*
<pre>array(3) {
  [0]=>
  string(5) "zhihu"
  [1]=>
  string(5) "weibo"
  [2]=>
  string(6) "腾讯"
}
*/