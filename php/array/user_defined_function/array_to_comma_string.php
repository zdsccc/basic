<?php

function array_to_comma_string ($array) {
	switch (count($array)) {
		case 0:
			return '';
		case 1:
			// 数组的第一个元素
			return reset($array);
		case 2:
			return join(' and ',$array);
		default:
			// 弹出最后一个元素
			$last = array_pop($array);
			return join(", ",$array) . ", and $last";
	}
}

$array = array ('one'=>'one','two'=>'two');
var_dump(array_to_comma_string($array));

