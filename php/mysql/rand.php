<?php
/**
 * Created by PhpStorm.
 * User: hiyesman
 * Date: 2018/3/21
 * Time: 22:40
 */
$mysql = mysqli_connect("localhost","root","","test");
if(!$mysql){
    exit(mysql_error());
}
mysqli_set_charset("utf8mb4");
// 效率低
$randSql = "select * from poetry order by rand() limit 1";
// 效率高
$r = mysqli_query("SELECT count(*) FROM user");
$d = mysqli_fetch_row($r);
$rand = mt_rand(0,$d);
echo $rand;
$r = mysqli_query("SELECT username FROM user LIMIT $rand, 1");
