<?php
$array = array (
    "A1",
    "A2",
    "A3",
    "A4",
    "A5",
);
$array[] = "A6";
echo "<pre>";
var_dump($array);
/*array(6) {
  [0]=>
  string(2) "A1"
  [1]=>
  string(2) "A2"
  [2]=>
  string(2) "A3"
  [3]=>
  string(2) "A4"
  [4]=>
  string(2) "A5"
  [5]=>
  string(2) "A6"
}*/

array_unshift($array,"A0");
var_dump($array);
/*array(7) {
  [0]=>
  string(2) "A0"
  [1]=>
  string(2) "A1"
  [2]=>
  string(2) "A2"
  [3]=>
  string(2) "A3"
  [4]=>
  string(2) "A4"
  [5]=>
  string(2) "A5"
  [6]=>
  string(2) "A6"
}*/