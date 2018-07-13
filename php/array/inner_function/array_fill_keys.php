<?php
$keys  = array (
    'foo',
    5 ,
    10,
    'bar'
);
$a = array_fill_keys($keys,'banana');
print_r($a);
/*
Array
(
    [foo] => banana
    [5] => banana
    [10] => banana
    [bar] => banana
)
*/

