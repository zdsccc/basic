<?php

// 使用postman构造post请求

$price = filter_input(INPUT_POST, 'price', FILTER_VALIDATE_FLOAT);

if ($price === false) {
	exit("Submitted price is invalid.");
}

echo $price;

