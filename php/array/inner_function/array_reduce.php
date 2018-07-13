<?php
function sum($carry, $item)
{
    $carry += $item;
    return $carry;
}

function product($carry, $item)
{
    $carry *= $item;
    return $carry;
}

$a = array(1, 2, 3, 4, 5);
$x = array();

// int(15)
var_dump(array_reduce($a, "sum"));
// int(1200), because: 10*1*2*3*4*5
var_dump(array_reduce($a, "product", 10));
// string(17) "No data to reduce"
var_dump(array_reduce($x, "sum", "No data to reduce"));