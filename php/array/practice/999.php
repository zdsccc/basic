<?php
// 数组元素统计
$arr = [2,1,3,0,4,3,2,3,4,4,4];
function duplicate($arr){
    $hash = array();
    $count = count($arr);
    for($i = 0; $i < $count; $i++){
        $hash[$arr[$i]] = isset($hash[$arr[$i]]) ? $hash[$arr[$i]] + 1 : 1;
    }
    return $hash;
}
var_dump(duplicate($arr));
echo "<br/>";
?>


<?php
// 数组元素统计
$arr = [2,1,3,0,4,3,2,3,4,4,4];
$count = array_reduce($arr, function($carry, $item) {
    // echo "---", $carry, "---", $item, "<br/>";
    $carry[$item] = isset($carry[$item]) ? $carry[$item] + 1 : 1;
    return $carry;
},[]);
echo "<pre>";
var_dump($count);
echo "</pre>";


