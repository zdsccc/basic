<?php
function user_key_compare_func($k1, $k2) {
    echo sprintf("debug key: %s vs %s %s<br />", $k1, $k2, $k1===$k2 ? 0 : ($k1>$k2?1:-1) ); //debug行
    if ( $k1 === $k2 ) {
        return 0;
    }
    return $k1 > $k2 ? 1 : -1;
}

$arr1 = array("name"=>'aiezu', "suffix"=>"com", "type"=>"domaim");
$arr2 = array("name"=>'爱E族', 'suffix'=>'', "en"=>'aiezu');

$result = array_intersect_ukey($arr1, $arr2, "user_key_compare_func");

print_r($result);