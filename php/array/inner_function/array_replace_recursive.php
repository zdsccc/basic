<?php
$base = array(
    'citrus' => array( "orange"),
    'berries' => array("blackberry", "raspberry")
);
$replacements = array(
    'citrus' => array('pineapple'),
    'berries' => array('blueberry')
);

$basket = array_replace_recursive($base, $replacements);
print_r($basket);

$basket = array_replace($base, $replacements);
print_r($basket);

/*
Array
(
    [citrus] => Array
    (
        [0] => pineapple
    )
    [berries] => Array
    (
        [0] => blueberry
        [1] => raspberry
    )
)
Array
(
    [citrus] => Array
    (
        [0] => pineapple
    )
    [berries] => Array
    (
        [0] => blueberry
    )
)
*/

