<?php

// 使用postman构造post请求

$choices = array (
	"man" => "男",
	"woman"=>"女"
);

if (! isset($_POST["gender"]) || ! array_key_exists($_POST['gender'], $choices)) {
	exit("You must select a valid choice.");
}

echo $_POST["gender"];
