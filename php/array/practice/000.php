<?php
if (0) {
    echo 999;
}
echo 888;
exit();
// 数组的第一个元素
$array = array(
    "manager" => "panke",
    "consignee" => "gavin",
    "man" => "yesman"
);

end($array);
echo key($array);

echo array_shift($array);

// 数组的第一个键
// reset($array);
// echo key($array);


