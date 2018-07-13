<?php
$url = "http://item.jd.com/13532838816.html";
//var_dump(strpos($url,".html"));
//echo trim($url);
//echo trim(trim($url), ".html");
//var_dump(strlen(trim($url)) - strlen(trim(trim($url), ".html")));

$s1 = "http://item.jd.com/";
$s2 = ".html";
// var_dump(substr($url, -5, strlen($s2)));

$skuId_url = substr(trim($url),strlen($s1),strlen(trim($url))-strlen($s1)-strlen($s2));

var_dump(is_numeric($skuId_url));
