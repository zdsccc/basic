<?php

// 这个模式匹配一个可选的负号，
// 然后至少有一位
if (! preg_match('/^-?\d+$/', $_POST['rating'])) {
	exit('Your rating must be an integer.');
}

