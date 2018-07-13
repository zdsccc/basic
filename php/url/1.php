<?php

// md5+aes+base64加密url，防数据暴露

// 创建config空对象
$cfg = new stdClass;

// md5密钥
$cfg->key1 = "123456";

// aes加密标准
$cfg->aes= "aes128";

// aes密钥
$cfg->key2 = "111111";

// aes iv值，初始向量
$cfg->iv = "kl3j42;l4j2;lkj4";


// 生成算法
// $s1为请求参数串，$cfg为配置参数对象
function createLink($s1, $cfg)
{
	// 生成检验和
	$v = md5($cfg->key1 . $s1);
	$s2 = "v=" . $v ."&" . $s1;
	// 加密
	$s3 = openssl_encrypt($s2, $cfg->aes, $cfg->key2, true, $cfg->iv);
	// 使用改进base64编码处理
	$s4=strtr(base64_encode($s3), "+/","_*");
	// 返回
	return $s4;
}

// 解析算法
// $s5为安全URL串,$cfg为配置参数对象
function parseLink($s5, $cfg)
{
	// 解码
	$s4 = base64_dencode(strtr($s5,"_*","+/"));
	// 解码失败
	if($s4 === false) return false;
	$s3 = openssl_decrypt($s4, $cfg->aes, $cfg->key2, true, $cfg->iv);
	// 解密失败
	if($s3 === false) return false;
	$i = strpos($s3,"&");
	// 未找到&
	if($i === false) return false;
	// $i是长度,解析嵌入的检验和
	$v=substr($s3, 0, $i);

	// 长度或标识不符
	if($i <> 34 || substr($v, 0, 2) <>"v=") return false;
	// 取检验和
	$v = substr($v, 2);
	// 解析s1
	$s1 = substr($s3, $i + 1);
	$s2 = $cfg->key1 . $s1;
	// 计算检验和
	$v2 = md5($s2);
	// 比较检验和
	if($v <> $v2) return false;
	return $s1;
}
