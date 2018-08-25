<?php
include "./Singleton.class.php";

// 不能通过new关键字实例化类
//$obj_first = new Singleton;
//var_dump($obj_first);
// Fatal error: Call to private Singleton::__construct() from invalid context in

// 只能使用getInstance方法创建对象
$obj_second = Singleton::getInstance();
var_dump($obj_second);
// object(Singleton)[1]

// 不能克隆对象
//$obj_third = clone $obj_second;
//var_dump($obj_third);
// Fatal error: Call to private Singleton::__clone() from context '' in

