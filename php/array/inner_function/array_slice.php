<?php

$arr = array("百度","zhihu","阿里","weibo","腾讯");

$slice_arr = array_slice($arr,1,3);

echo "<pre>";
var_dump($slice_arr);

/*
<pre>array(3) {
  [0]=>
  string(5) "zhihu"
  [1]=>
  string(6) "阿里"
  [2]=>
  string(5) "weibo"
}
*/