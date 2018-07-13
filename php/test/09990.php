<?php
/**
 * Created by PhpStorm.
 * User: yesman
 * Date: 2018/5/9
 * Time: 13:11
 */

$url = "http://union-click.jd.com/jdc?e=&p=AyIEVB5rHQoTDlYeUhYDIgRSGFIWBBUOUhxSJUZNXwtEa0xHV0YXEEULRFIYDk5ER1xOGRRDBENcVmkFWgMLdEZCJV8eS2dWVwoVGU9GfF8AF1gSARsEUxxSEgUbEAJYBUkOQEYXK1NxAmlyJ1smcGVKXzdzIFN7UQQQfx0ZDnwEVBtSCQMWG1QTShUAGQdVEFkVMhoOUhteFgIQDmUbWhQDEARSHVkSMmIHVBpYFwATBlwrWxQyU2lVHlITBxU3VCtbEQEWDlAYXB0CEgBcK1wlX0pYD14PR1t8BWUrayUyIgdUK1g%3D&t=W1dCFFlQCxxUR0pADgpQTFtLWgNKVExDO0saTRxkUxBrH1Bcd0MFRFVXWFZpDU5XFgURDlYdXBwFFQ5CTBhLXh5VFFk%3D";

echo urlencode($url);

$pingouUrl = "https://wq.jd.com/pingou_api/GetAutoTuan?sku_id=12100791158&from=cps";
var_dump(strpos($pingouUrl,"https://wq.jd.com/pingou_api/GetAutoTuan?sku_id="));

echo "<br />";
echo strlen($pingouUrl);