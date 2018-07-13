<?php
$array  =   array('a'=>1, 'b'=>2, 'B'=>3);
print_r($array);
//Array ( [a] => 1 [b] => 2 [B] => 3 )
echo "<br />";
print_r(array_change_key_case($array,CASE_LOWER));
//Array ( [a] => 1 [b] => 3 )