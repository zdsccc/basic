<?php

// file encoding:UTF-8

// 这个文件里的内容是：说的对
$dir = "D:\测试中文路径\hello.txt";
// $dir中，中文是utf-8编码格式（因为文件编码是UTF-8），
// windows下使用该路径是找不到对应目录的，
// 因为不同文件系统的文件名（含路径）编码是不同的

echo file_get_contents($dir),"<br />";
/**
 * Warning: file_get_contents(D:\娴嬭瘯涓枃璺緞\hello.txt)
 * [function.file-get-contents]:
 * failed to open stream: No such file or directory
 * in D:\git\github\basicPHP\charset\filename_encoding\ceshi.php on line 5
 */

$dir = iconv("UTF-8", "GBK", $dir);
// output：说得对
echo file_get_contents($dir);

