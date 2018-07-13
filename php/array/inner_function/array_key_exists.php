<?php

$arr = array(
    'id'   => 1,
    'name' => 'admin',
    'desc' => null
);
// bool(true)
var_dump(array_key_exists("name",$arr));
// bool(true)
var_dump(array_key_exists("desc",$arr));
