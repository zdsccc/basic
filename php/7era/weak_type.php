<?php

function sum(int $a, int $b) {
    return $a + $b;
}
// output:3
var_dump(sum(1, 2));

// output:3
// These will be coerced to integers: note the output below!
var_dump(sum(1.5, 2.5));