<?php
/**
 * Created by PhpStorm.
 * User: yesman
 * Date: 2018/5/16
 * Time: 13:16
 */

$Shortcut = "[InternetShortcut]
URL=http://www.sharejs.com/
IDList=[{000214A0-0000-0000-C000-000000000046}]
Prop3=19,2";
Header("Content-type: application/octet-stream");
header("Content-Disposition: attachment; filename=脚本分享网.url;");
echo $Shortcut;
//该代码片段来自于: http://www.sharejs.com/codes/php/8894
