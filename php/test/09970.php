<?php
/**
 * Created by PhpStorm.
 * User: yesman
 * Date: 2018/7/26
 * Time: 9:26
 */

$price_ladder = array(
    array("amount"=>2,"price"=>80),
    array("amount"=>5,"price"=>70)
);

// 要实现的逻辑：
// 小于等于1阶amount时，采用1阶amount对应的price
// 大于1阶amount，小于等于2阶amount时，采用2阶amount对应的price
// 没有3阶amount的情况，采用2阶price


// 下面是自己写的函数
// foreach 指针后移
// each函数 7.2 deprecated

function get_ladder_price ($price_ladder,$now_amount)
{
    if (empty($price_ladder)) {
        return 0;
    }
    foreach ($price_ladder as $ladder) {
        $price_ladder_new[$ladder["amount"]] = $ladder["price"];
    }

    // 键名排序
    ksort($price_ladder_new);

    if (isset($price_ladder_new[$now_amount])) {
        $now_price = $price_ladder_new[$now_amount];
        return $now_price;
    } else {
        $price_ladder_new[$now_amount] = -1;
        ksort($price_ladder_new);
        end($price_ladder_new);
        $endkey = key($price_ladder_new);
        $end_prev_val = prev($price_ladder_new);
        // 必须reset指针
        reset($price_ladder_new);
        foreach ($price_ladder_new as $kk=>$vv) {
            if ($kk == $now_amount) {
                if ($kk === $endkey) {
                    return $end_prev_val;
                }
                $temp = current($price_ladder_new);
                if ($temp !== false) {
                    return $temp;
                } else {
                    return 0;
                }
            }
        }
    }
}

echo "<hr />";
echo "1------", get_ladder_price($price_ladder,1), "<br />";
echo "2------", get_ladder_price($price_ladder,2), "<br />";
echo "3------", get_ladder_price($price_ladder,3), "<br />";
echo "4------", get_ladder_price($price_ladder,4), "<br />";
echo "5------", get_ladder_price($price_ladder,5), "<br />";
echo "6------", get_ladder_price($price_ladder,6), "<br />";
echo "10-----", get_ladder_price($price_ladder,10), "<br />";
echo "<hr />";
