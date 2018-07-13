<?php
function takes_array($input)
{
    // 变量名不支持[]
    // 如果支持就坏了
    echo "$input[0] + $input[1] = ", $input[0]+$input[1];
}
// 2 + 3 = 5
takes_array(array(2,3));

