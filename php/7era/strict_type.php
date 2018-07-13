<?php
/**
 * Created by PhpStorm.
 * User: hiyesman
 * Date: 2018/4/20
 * Time: 23:53
 */

// 7
declare(strict_types = 1);

function sum(int $a, int $b) {
    return $a + $b;
}

var_dump(sum(1, 2));
var_dump(sum(1.5, 2.5));

/**
 * int(3)
 * Fatal error:
 * Uncaught TypeError:
 * Argument 1 passed to sum() must be of the type integer, float given,
 * called in D:\git\github\basicPHP\7era\strict_type.php on line 17 and defined in D:\git\github\basicPHP\7era\strict_type.php:12 Stack trace: #0 D:\git\github\basicPHP\7era\strict_type.php(17): sum(1.5, 2.5) #1 {main} thrown in D:\git\github\basicPHP\7era\strict_type.php on line 12
 */
