<?php

$arr = array(
    true    => 'true',
    false   => 'boolean'
);

echo "<pre>";
var_dump($arr);
/*
array(2) {
  [1]=>
  string(4) "true"
  [0]=>
  string(7) "boolean"
}
*/

// boolean|true
echo $arr[0],"|",$arr[1];
