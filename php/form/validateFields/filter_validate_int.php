<?php

// 使用postman构造post请求

$age = filter_input(INPUT_POST, 'age', FILTER_VALIDATE_INT );

if ($age === false) {
	exit("Submitted age is invalid.");
}

echo $age;
