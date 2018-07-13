<?php

// 使用postman构造post请求
// 如果表单将月、日、年作为单独的元素，可以把这些值传入checkdate()

if (! checkdate($_POST['month'], $_POST['day'], $_POST['year'])) {
	exit("The date you entered doesn't exist!");
}

echo $_POST['year'],$_POST['month'],$_POST['day'];

