<?php
header("Content-type:text/html;charset=UTF-8");
// 隐藏部分字符串
function func_substr_replace($str, $replacement = '*', $start = 1, $length = 3)
{
    $len = mb_strlen($str, 'utf-8');
    // 手机号
    if (preg_match("/\d[11]/", $str)) {
        return substr($str, 0, 3) . "****" . substr($str, 7);
    }
    if ($len > intval($start + $length)) {
        $str1 = mb_substr($str, 0, $start, 'utf-8');
        $str2 = mb_substr($str, intval($start + $length), NULL, 'utf-8');
        echo "hah", $str2, "hah", "<br />";
    } else {
        $str1 = mb_substr($str, 0, 1, 'utf-8');
        if ($len != 1) {
            $str2 = mb_substr($str, $len - 1, 1, 'utf-8');
        } else {
            $str2 = "";
        }
        $length = $len - 2;
        if ($length <= 0) {
            $length = 1;
        }
    }
    $new_str = $str1;
    for ($i = 0; $i < $length; $i++) {
        $new_str .= $replacement;
    }
    $new_str .= $str2;
    return $new_str;
}
echo func_substr_replace("梦"), "<br />";
echo func_substr_replace("梦娜"), "<br />";
echo func_substr_replace("测试订单"), "<br />";
echo func_substr_replace("yesman"), "<br />";
echo func_substr_replace("yes"), "<br />";
echo func_substr_replace("19954151541"), "<br />";
echo func_substr_replace("12345666"), "<br />";

