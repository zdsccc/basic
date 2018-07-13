<!--
	<input type="checkbox" name="subscribe" value="yes">subscribe?
-->
<?php

// 使用postman构造post请求

$value = 'yes';

// 验证复选框
if (filter_has_var(INPUT_POST, 'subscribe')) {
	// 提交了正确的值
	if ($_POST['subscribe'] == $value) {
		$subscribed = true;
	} else {
		// 提交了一个不正确的值
		$subscribed = false;
		exit("Invalid checkbox value submitted.");
	}
} else {
	// 未提交任何值
	$subscribed = false;
}
if ($subscribed) {
	print "You are subscribed.";
} else {
	exit("You are not subscribed.");
}
