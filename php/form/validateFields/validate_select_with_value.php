<!--
<select name="food">
	<option value="eggs">Eggs Benedict</option>
	<option value="toast">Buttered Toast with Jam</option>
	<option value="coffee">Piping Hot Coffee</option>
</select>
-->
<?php

$foods = array(
	'eggs' => 'Eggs Benedict',
	'toast' => 'Buttered Toast with Jam',
	'coffee' => 'Piping Hot Coffee'
);

if (! array_key_exists($_POST['food'], $foods)) {
	exit("Ypu must select a valid choice.");
}

