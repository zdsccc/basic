<?php

// file encoding:GBK

// ����ļ���������ǣ�˵�Ķ�
$dir = "D:\��������·��\hello.txt";
// $dir�У�������gbk�����ʽ����Ϊ�ļ�������gbk����
// windows��ʹ�ø�·�������ҵ���ӦĿ¼

// output��˵�ö�
echo file_get_contents($dir),"<br />";

$dir = iconv("UTF-8", "GBK", $dir);
echo file_get_contents($dir);
// ��ʱ����ôת����һ��û�������ˣ���������gbk��
// ���ǣ�iconv�ĵ�һ����������·���ַ���ʱ��
// ���ֽڻᷢ�����󣬴�Ӣ��·�����ã����Ļᷢ�����������
// 1���������ĳ���Ϊ3�ı������п��ܿɱ���utf8���ֽڲ��ҵ�unicode������Ӧ���ַ���
// 2���������ĳ��Ȳ���3�ı��������1���������ֽڻ���Ϊ�Ҳ�����
// unicode��Ӧ�Ĵʶ��������ֽڴ����������php��Ҫ�����

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
