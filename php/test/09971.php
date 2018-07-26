<?php
/**
 * Created by PhpStorm.
 * User: yesman
 * Date: 2018/7/25
 * Time: 13:32
 */

$ext_info = 'a:4:{s:12:"price_ladder";a:2:{i:0;a:2:{s:6:"amount";i:2;s:5:"price";d:130;}i:1;a:2:{s:6:"amount";i:54;s:5:"price";d:110;}}s:15:"restrict_amount";i:55;s:13:"gift_integral";i:0;s:7:"deposit";d:0;}';

echo "<pre>";
var_dump(unserialize($ext_info));

