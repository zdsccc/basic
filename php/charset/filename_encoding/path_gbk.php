<?php

// file encoding:GBK

// 这个文件里的内容是：说的对
$dir = "D:\测试中文路径\hello.txt";
// $dir中，中文是gbk编码格式（因为文件编码是gbk），
// windows下使用该路径可以找到对应目录

// output：说得对
echo file_get_contents($dir),"<br />";

$dir = iconv("UTF-8", "GBK", $dir);
echo file_get_contents($dir);
// 这时再这么转换，一是没有意义了，本来就是gbk了
// 二是，iconv的第一个参数检测该路径字符串时，
// 断字节会发生错误，纯英文路径还好，中文会发生两种情况：
// 1、连续中文长度为3的倍数，有可能可被按utf8断字节并找到unicode编码表对应的字符；
// 2、连续中文长度不是3的倍数，最后1个或两个字节会因为找不到；
// unicode对应的词而发生断字节错误，这种情况php是要报错的

/**
 * Notice: iconv() [function.iconv]:
 * Detected an illegal character in input string
 * in D:\git\github\basicPHP\charset\filename_encoding\path_gbk.php on line 17
 *
 * Warning: file_get_contents(D:\)
 * [function.file-get-contents]:
 * failed to open stream:
 * No such file or directory
 * in D:\git\github\basicPHP\charset\filename_encoding\path_gbk.php on line 18
 */
