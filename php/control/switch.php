<?php
/**
 * Created by PhpStorm.
 * User: yesman
 * Date: 2018/6/5
 * Time: 10:33
 */

$case = "weixin.app";
$case = "weixin.wap";
$case = "";

switch ($case)
{
    case "weixin.app":
    case "weixin.wap":
        echo "zouwo";
        break;
    default:
        echo "default";
        break;
}

