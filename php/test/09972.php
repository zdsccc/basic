<?php
$attr = '{"order_product":"[{\"goods_id\":73,\"property\":[],\"num\":1,\"total_amount\":1,\"iscart\":\"false\"}]","consignee":"48","shipping":"1","extension_code":"group_buy","extension_id":"6"}';
$attr_arr = json_decode($attr, true);
echo "<pre>";
var_dump($attr_arr);

extract($attr_arr);

echo $extension_code,"--",$extension_id;

// what is wrong?

