<?php

// 使用postman构造post请求

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
	exit("Error request!");
}

echo $_SERVER["REQUEST_METHOD"];
