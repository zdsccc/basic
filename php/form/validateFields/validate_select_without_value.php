<!--
<select name="food">
	<option>Eggs</option>
	<option>Toast</option>
	<option>Coffee</option>
</select>
-->
<?php

// 对于没有value的select下拉菜单
$foods = array("Eggs","Toast","Coffee");

// 之后验证表单
if (! in_array($_POST['food'], $foods)) {
	exit("You must select a valid choice.");
}

echo $_POST["food"];

