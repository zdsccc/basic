<?php
/**
 * Created by PhpStorm.
 * User: yesman
 * Date: 2018/5/18
 * Time: 15:17
 */

// gotcha
echo trim('abc', 'bad');

echo "<pre>";

// array
$fruit  = array( 'apple' , 'banana ' ,  ' cranberry ' );
var_dump(trim($fruit));
var_dump(@trim($fruit));

// object
$stdClass = new stdClass();
$stdClass->username = "yesman";
$stdClass->password = "hi";
var_dump(trim($stdClass));
var_dump(@trim($stdClass));

// null
$null = null;
var_dump(trim($null));
var_dump(@trim($null));

// int
$int = 541212;
var_dump(trim($int));
var_dump(@trim($int));

// boolean
//$boolean = true;
$boolean = false;
var_dump(trim($boolean));
var_dump(@trim($boolean));

