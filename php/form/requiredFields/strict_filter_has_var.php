<?php

// 使用postman构造post请求
// 不同的表单元素未填写或选中，提交时表现不同。
// 非浏览器提交的情况

// !的优先级高
if (! (filter_has_var(INPUT_POST, 'flavor') && (strlen(filter_input(INPUT_POST, 'flavor')) > 0))) {
	exit("You must enter your favorite ice cream flavor.");
}

// $_POST['color'] 是可选的，不过如果提供了color（颜色），
// 则必须保证在清理处理后要多于5个字符
if (filter_has_var(INPUT_POST, 'color') && (strlen(filter_input(INPUT_POST, 'color', FILTER_SANITIZE_STRING)) <= 5)) {
	exit('color must be more than 5 characters.');
}

// 确保$_POST['choices']存在而且是一个数组
if (! (filter_has_var(INPUT_POST, 'choices') && filter_input(INPUT_POST, 'choices', FILTER_DEFAULT, FILTER_REQUIRE_ARRAY))) {
	exit("You must select some choices.");
}

// 用,不用.
echo "continue, yesman..." , "<br/>";


