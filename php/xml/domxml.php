<?php
/**
 * Created by PhpStorm.
 * User: yesman
 * Date: 2018/6/19
 * Time: 17:03
 */

$dom = new DOMDocument("1.0","utf-8");

// test：节点
// this is the root element!：节点数据
$element = $dom->createElement("test", "this is the root element!");

// insert the new element as root (child of document)
$dom->appendChild($element);

echo $dom->saveXML();
/**
 * 输出结果：
 * <?xml version="1.0" encoding="utf-8"?>
 * <test>this is the root element!</test>
 */
