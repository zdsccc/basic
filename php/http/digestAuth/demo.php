<?php
/*
 * 可以替换为适当的用户名和密码检查，如检查一个数据库
 */
$users = array (
	'yesman' => 'hello',
	'gavin' => 'sousoudi'
);

$realm = 'My Website';

$username = validate_digest($realm, $users);

// 如果提供了不合法的认证数据，不会执行到这里
print "Hello，" . htmlentities($username);

function validate_digest($realm, $users)
{
	// 如果客户端没有提供摘要，则会失败
	if (! isset($_SERVER['PHP_AUTH_DIGEST'])) {
		send_digest($realm);
	}
	echo 1;
	// 如果摘要无法解析，则会失败
	$username = parse_digest($_SERVER['PHP_AUTH_DIGEST'], $realm, $users);
	if ($username === false) {
		send_digest($realm);
	}
	// 摘要中指定了合法的用户名
	return $username;
}

function send_digest ($realm) {
	http_response_code(401);
	$nonce = md5(uniqid());
	$opaque = md5($realm);
	header("WWW-Authenticate: Digest realm=\"$realm\" qop=\"auth\" " . "nonce=\"$nonce\" opaque=\"$opaque\" ");
	echo "You need to enter a valid username and password.";
	exit;
}

function parse_digest($digest, $realm, $users) {
	// 需要在摘要首部中查找以下值：
	// username、uri、qop、cnonce、nc和response
	$digest_info = array();
	foreach (array('username','uri','nonce','cnonce','response') as $part) {
		// 定界符可以是'或"，也可以没有（对于qop和nc）
		if (preg_match('/'.$part.'=([\'"]?)(.*?)\1/', $digest, $match)) {
			// 找到这一部分，保存来完成计算
			$digest_info[$part] = $match[2];
		} else {
			// 如果没有这一部分，摘要验证失败
			return false;
		}
	}
	// 确保提供了正确的qop
	if (preg_match('/qop=auth(,|$)/', $digest)) {
		$digest_info['qop'] = 'auth';
	} else {
		return false;
	}
	// 确保提供了合法的nonce数
	if (preg_match('/nc=([0-9a-f]{8})(,|$)/', $digest, $match)) {
		$digest_info['nc'] = $match[1];
	} else {
		return false;
	}
	// 既然已经验证摘要首部中提供了所有必要的值
	// 完成必要的算法计算
	// 确保提供了正确的信息
	//
	// 这些计算在RFC 2617的3.2.2、3.2.2.1
	// 和3.2.2.2节介绍
	// 算法为md5
	$A1 = $digest_info['username'] . ':' . $realm . ':' . $users[$digest_info['username']];
	// qop 为'auth'
	$A2 = $_SERVER['REQUEST_METHOD'] . ':' . $digest_info['uri'];
	$request_digest = md5(implode(':', array(md5($A1), $digest_info['nonce'], $digest_info['nc'], $digest_info['cnonce'], $digest_info['qop'], md5($A2))));
	// 发送的摘要与我们计算的摘要是否一致？
	if ($request_digest != $digest_info['response']) {
		return false;
	}
	// 一切正常，返回用户名
	return $digest_info['username'];
}
