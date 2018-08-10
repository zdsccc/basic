<?php

$totalrow = 0;
$data = array(
    "cn_name"   => "zhangdashuai",
    "en_name"   => "yesman"
);

// 不建议使用，但是用起来是没问题的
if (/*$totalrow != 0 &&*/ is_array($data) && !empty($data)) {
    exit("in");
}
echo "out";

