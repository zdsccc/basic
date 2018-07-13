<?php
// 使用基本认证，并要求在每晚午夜12点强制注销
if (!validate($_SERVER['PHP_AUTH_USER'],$_SERVER['PHP_AUTH_PW'])) {
		$realm = 'My Website for ' . date('Y-m-d');
        http_response_code(401);
        // 可以改变安全域字符串My Website
        header('WWW-Authenticate: Basic realm="' . $realm . '"');
        // 如果用户单击浏览器认证对话框中的Cancel，将显示下面的消息
        echo "You need to enter a valid username and password.";
        exit();
}

