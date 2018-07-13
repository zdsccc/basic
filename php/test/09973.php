<?php
/**
 * Created by PhpStorm.
 * User: hiyesman
 * Date: 2018/5/20
 * Time: 19:19
 */

// PHP强制下载文件
// 有时我们不想让浏览器直接打开文件，如PDF文件，而是要直接下载文件
// 那么以下函数可以强制下载文件，
// 函数中使用了application/octet-stream头类型。

function force_download($filename)
{
    if ((isset($filename))&&(file_exists($filename))){
        header("Content-length: ".filesize($filename));
        header('Content-Type: application/octet-stream');
        header('Content-Disposition: attachment; filename="' . $filename . '"');
        readfile("$filename");
    } else {
        echo "Looks like file does not exist!";
    }
}

force_download('/down/test_45f73e852.zip');

