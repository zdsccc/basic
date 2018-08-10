<?php
$yhqExt = '{"discountFee":500,"appliedCount":1,"name":"满100少5","startFee":10000,"startTime":1532448000000,"id":1326801412,"endTime":1535731199000,"totalCount":9999,"status":1}';

echo "<pre>";
var_dump(json_decode($yhqExt, true));

if (json_last_error() !== JSON_ERROR_NONE) {
    // code
}

/*
 * 字段：
 *
 * discountFee
 * appliedCount
 * name
 * startFee
 * startTime
 * id
 * endTime
 * totalCount
 * status
 */




