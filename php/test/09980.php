<?php
/**
 * Created by PhpStorm.
 * User: yesman
 * Date: 2018/5/18
 * Time: 13:35
 */

$string = "Your String";
for($i=0;$i<strlen($string);$i++){
    $char = substr($string,$i,1);
}

echo $char;

