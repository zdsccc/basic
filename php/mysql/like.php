<?php
/**
 * Created by PhpStorm.
 * User: yesman
 * Date: 2018/5/16
 * Time: 13:45
 */

$stdClass           = new stdClass();
$stdClass->host     = "localhost";
$stdClass->username = "root";
$stdClass->password = "";

mysql_connect($stdClass->host, $stdClass->username, $stdClass->password);
mysql_select_db("lt");
mysql_set_charset("utf8");

$like_str = "_";

$query_sql_like = "
    SELECT 
        `goodsName`
    FROM
        `pingou`
    WHERE
        `goodsName` like '%" . mysql_like_quote(mysql_real_escape_string($like_str)) . "%'
";

// SELECT `goodsName` FROM `pingou` WHERE `goodsName` like '%_%'
// SELECT `goodsName` FROM `pingou` WHERE `goodsName` like '%\_%'
echo $query_sql_like;

// _是通配符
// 这样执行会将所有数据都选出来

function mysql_like_quote($str)
{
    return strtr($str, array("\\\\" => "\\\\\\\\", '_' => '\_', '%' => '\%', "\'" => "\\\\\'"));
}

