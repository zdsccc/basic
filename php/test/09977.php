<?php
/**
 * Created by PhpStorm.
 * User: yesman
 * Date: 2018/5/18
 * Time: 13:57
 */

/**
 *
 * @param String $string
 * @return float
 *
 * Returns a float between 0 and 100. The closer the number is to 100 the
 * the stronger password is; further from 100 the weaker the password is.
 */
function password_strength($string){
    $h    = 0;
    $size = strlen($string);
    foreach(count_chars($string, 1) as $v){
        $p = $v / $size;
        $h -= $p * log($p) / log(2);
    }
    $strength = ($h / 4) * 100;
    if($strength > 100){
        $strength = 100;
    }
    return $strength;
}

var_dump(password_strength("Correct Horse Battery Staple"));
echo "<br>";
var_dump(password_strength("Super Monkey Ball"));
echo "<br>";
var_dump(password_strength("Tr0ub4dor&3"));
echo "<br>";
var_dump(password_strength("abc123"));
echo "<br>";
var_dump(password_strength("sweet"));
echo "<br>";
var_dump(password_strength("abcdefghijklmnopqrstuvwxyz"));