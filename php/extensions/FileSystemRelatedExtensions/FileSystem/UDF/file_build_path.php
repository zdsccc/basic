<?php
/**
 * Created by PhpStorm.
 * User: hiyesman
 * Date: 2018/4/20
 * Time: 23:27
 */

// 5.6+
function file_build_path(...$segments) {
    return join(DIRECTORY_SEPARATOR, $segments);
}

echo file_build_path("wo","hen","hao");

// 5.6-
function file_build_path2() {
    return join(DIRECTORY_SEPARATOR, func_get_args());
}

echo file_build_path2("home", "alice", "Documents", "example.txt");