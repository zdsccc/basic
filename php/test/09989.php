<?php
/**
 * Created by PhpStorm.
 * User: yesman
 * Date: 2018/5/10
 * Time: 9:59
 */

$pingouUrl = "https://wq.jd.com/pingou_api/GetAutoTuan?sku_id=25999780633&from=cps";
echo strlen(trim($pingouUrl)) - strlen(trim(trim($pingouUrl),"&from=cps"));

$str = "china";