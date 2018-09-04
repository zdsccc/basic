<?php
// 数组的分组

$order = array (
  0 =>
    array (
      'order_id' =>  '1152',
      'order_sn' =>  '2018063099254',
      'order_time' =>  '2018-06-30 14:32:40',
      'order_status' =>  '已确认,已付款,收货确认',
      'shipping_status' =>  '2',
      'total_fee' =>  '￥0.10',
      'handler' =>  '<span style="color:#565656">已确认</span>'
    ),
  1 =>
    array (
      'order_id' => '931',
      'order_sn' => '2018063091426',
      'order_time' => '2018-06-30 13:17:36',
      'order_status' => '已确认,已付款,未发货',
      'shipping_status' => '0',
      'total_fee' => '￥0.10',
      'handler' => '<span style="color:#565656">已确认</span>'
    )
);

$order_goods = array (
  0 =>
    array (
      'order_id' =>  '931',
      'goods_id' => '82',
      'goods_name' => '测试专用'
    ),
  1 =>
      array (
      'order_id' => '1152',
      'goods_id' => '53',
      'goods_name' => "it's skin伊思能量10精华辅酶弹力保湿安瓶30ml"
      ),
  2 =>
    array (
      'order_id' => '1152',
      'goods_id' => '89',
      'goods_name' => 'Nature Republic/自然乐园芦荟舒缓保湿凝胶300ml'
    ),
  3 =>
    array (
      'order_id' => '1152',
      'goods_id' => '44',
      'goods_name' => 'Whoo后拱辰享洗面奶气韵生润颜洁面膏温和净透180ml'
    )
);
$result = array();
foreach ($order_goods as $k=>$v) {
    $result[$v['order_id']][] = $v;
}

echo "<pre>";
var_dump($result);

