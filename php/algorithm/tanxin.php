<?php
/**
 * Created by PhpStorm.
 * User: yesman
 * Date: 2018/6/7
 * Time: 11:59
 */

/*
* 贪婪算法
* $arr   array  处理数组
* $volume  int   盒子容量
*/
function greedy($arr, $volume)
{
    $box = array();
    $boxNum = 0;
    $num = count( $arr );
    for ($i = 0; $i < $num; $i++)
    {
        $boxCode = true;
        for ($j = 0; $j < $boxNum; $j++)
        {
            if ($arr[$i] + $box[$j]['v'] <= $volume)
            {
                $box[$j]['v'] += $arr[$i];
                $box[$j]['k'][] = $i;
                $boxCode = false;
                break;
            }
        }
        if ($boxCode)
        {
            $box[$boxNum]['v'] = $arr[$i];
            $box[$boxNum]['k'][] = $i;
            $boxNum++;
        }
    }
    return $box;
}
echo "<pre>";
var_dump(greedy(array(5, 1, 6), 6));


