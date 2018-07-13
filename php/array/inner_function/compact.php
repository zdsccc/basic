<?php
$username = "aaa";
$password = "bbb";
$options  = array("ccc", "ddd");
$arr      = compact("username","password","token","options");
var_dump($arr);
//array(3) {
//	["username"]=> string(3) "aaa"
//	["password"]=> string(3) "bbb"
//	["options"]=> array(2) {
//				[0]=> string(3) "ccc"
//				[1]=> string(3) "ddd"
//	}
//}