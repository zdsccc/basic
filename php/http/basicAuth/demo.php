<?php

// HTTP 基础认证

if(!validate($_SERVER['PHP_AUTH_USER'],$_SERVER['PHP_AUTH_PW'])){
	http_response_code(401);
	// 可以改变安全域字符串My Website
	header('WWW-Authenticate: Basic realm="My Website"');
	// 如果用户单击浏览器认证对话框中的Cancel，将显示下面的消息
	echo "You need to enter a valid username and password.";
	exit();
}

function validate ($user,$pass) {
	$users = array(
		'yesman'=>'hello',
		'gavin'=>'yaoxi'
	);
	if(isset($users[$user]) && ($users[$user] === $pass)){
		// 可以改为其他逻辑
		return true;
	}else{
		return false;
	}
}

echo 999;

