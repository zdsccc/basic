<!--
<input type="checkbox" name="food[]" value="egg">egg
<input type="checkbox" name="food[]" value="ice">ice
<input type="checkbox" name="food[]" value="apple">apple
-->
<?php

// 使用postman构造post请求

$foods = array(
	'egg' => 'egg',
	'ice' => 'ice',
	'apple' => 'apple'
);

// 提交的所有值必须都得在可选项中
// 计算数组的交集
if (!isset($_POST['food']) || (array_intersect($_POST['food'], array_keys($foods)) != $_POST['food'])) {
	exit("You must select only valid choices.");
}

var_dump($_POST['food']);
