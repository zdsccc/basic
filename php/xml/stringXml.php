<?php
/**
 * Created by PhpStorm.
 * User: yesman
 * Date: 2018/6/19
 * Time: 17:08
 */

header("Content-type:text/xml;");
$xml = "<?xml version='1.0' encoding='UTF-8'?>\n";
$xml .= "<root>\n";
$xml .= "<code>200</code>\n";
$xml .= "<message>数据返回成功</message>\n";
$xml .= "<data>\n";
$xml .= "<id>1</id>\n";
$xml .= "<name>yangzl</name>\n";
$xml .= "</data>\n";
$xml .= "</root>\n";
echo $xml;

/**
 * This XML file does not appear to have any style information associated with it. The document tree is shown below.
 * <root>
 * <code>200</code>
 * <message>数据返回成功</message>
 * <data>
 * <id>1</id>
 * <name>yangzl</name>
 * </data>
 * </root>
 */

