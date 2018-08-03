<?php
header("Content-type:text/html;charset=UTF-8");
$badword = array( '张三','张三丰','张三丰田');
$badword1 =array_combine($badword,array_fill(0,count($badword),'*'));
var_dump($badword1);
$bb = '我今天开着张三丰田上班';
$str = strtr($bb,$badword1);
echo $str;

