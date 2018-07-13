<?php
/**
 * Created by PhpStorm.
 * User: hiyesman
 * Date: 2018/4/20
 * Time: 23:41
 */

// 可引申为多字符串拼接的方案

$path = join(DIRECTORY_SEPARATOR, array('root', 'lib', 'file.php'));
echo $path,"<br />";

// 5.6+ ...运算符
function file_build_path_h(...$segments) {
    echo "high", "<br />";
    return join(DIRECTORY_SEPARATOR, $segments);
}
// 5.6-
function file_build_path_l() {
    echo "low", "<br />";
    return join(DIRECTORY_SEPARATOR, func_get_args());
}
echo file_build_path_h("wo","hen","hao"),"<br />";
echo file_build_path_l("home", "alice", "Documents", "example.txt"),"<br />";

// 根据版本号选择使用的函数
// 怎么传参还没搞懂？？？？
function file_build_path() {
    if (version_compare(phpversion(), '5.6.0', '>='))
    {
        // echo phpversion(), "<br />";
        // echo "high", "<br />";
        return file_build_path_h(join(",", func_get_args()));
    }
    else
    {
        // echo phpversion(), "<br />";
        // echo "low", "<br />";
        return file_build_path_l(join(",", func_get_args()));
    }
}

echo file_build_path("c","a","d");

