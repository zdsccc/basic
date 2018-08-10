<?php
// 一个有效的 json 字符串
$json[] = '{"Organization": "PHP Documentation Team"}';
// 一个无效的 json 字符串会导致一个语法错误，在这个例子里我们使用 ' 代替了 " 作为引号
$json[] = "{'Organization': 'PHP Documentation Team'}";
foreach ($json as $string) {
    echo 'Decoding: ' . $string;
    json_decode($string);
    switch (json_last_error()) {
        case JSON_ERROR_NONE:
            echo ' - No errors';
            break;
        case JSON_ERROR_DEPTH:
            echo ' - Maximum stack depth exceeded';
            break;
        case JSON_ERROR_STATE_MISMATCH:
            echo ' - Underflow or the modes mismatch';
            break;
        case JSON_ERROR_CTRL_CHAR:
            echo ' - Unexpected control character found';
            break;
        case JSON_ERROR_SYNTAX:
            echo ' - Syntax error, malformed JSON';
            break;
        case JSON_ERROR_UTF8:
            echo ' - Malformed UTF-8 characters, possibly incorrectly encoded';
            break;
        default:
            echo ' - Unknown error';
            break;
    }
    echo PHP_EOL;
}
// result
// Decoding: {"Organization": "PHP Documentation Team"} - No errors
// Decoding: {'Organization': 'PHP Documentation Team'} - Syntax error, malformed JSON


