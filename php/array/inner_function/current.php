<?php

$array = array(
	"two" => "er"
);

array_unshift($array, "yi");

var_dump($array);

var_dump(current($array));
