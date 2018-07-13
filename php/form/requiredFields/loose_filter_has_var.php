<?php

// 使用postman构造post请求

if (! filter_has_var(INPUT_POST, 'flavor')) {
	exit("You must enter your favorite ice cream flavor.");
}

echo $_POST["flavor"];

