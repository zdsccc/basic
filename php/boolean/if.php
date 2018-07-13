<?php
$bool = 0;
$bool1 = 1;

// 0
if(!$bool){
    echo $bool;
}elseif($bool1){
    echo $bool1;
}
echo "<hr />";
// 1
if($bool1){
    echo $bool1;
}elseif(!$bool){
    echo $bool;
}