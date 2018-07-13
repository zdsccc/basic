<?php

$arr = array("百度","阿里","腾讯","百度","微博");

$data = array_unique($arr);

echo "<pre>";
var_dump($data);
/*
<pre>array(4) {
  [0]=>
  string(6) "百度"
  [1]=>
  string(6) "阿里"
  [2]=>
  string(6) "腾讯"
  [4]=>
  string(6) "微博"
}
*/