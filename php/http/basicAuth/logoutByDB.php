<?php
// 将登陆时间存储在数据库中，如果自用户上一次请求一个手保护页面之后已经超过了15分钟，则强制注销
function validate_date ($user, $pass) {
	$db = new PDO('sqlite:/databases/users');
	//准备和执行
	$st = $db->prepare('select password,last_access from users where user like ?');
	$st->execute(array($user));
	if ($ob = $st->fetchObject()) {
		if ($ob->password == $pass) {
			$now = time();
			if (($now - $ob->last_access) > (15 * 60)) {
				return false;
			} else {
				// 更新上一次访问时间
				$st2 = $db->prepare('update users set last_access = "now" - where user like ?');
				$st2->execute(array($user));
				return true;
			}
		}
	}
	return false;
}

