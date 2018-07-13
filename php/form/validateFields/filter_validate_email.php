<?php

// 使用postman构造post请求

$email = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);

if ($email === false) {
	exit("Submitted email address is invalid.");
}

echo $email;

