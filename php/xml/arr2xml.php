<?php
// xml方式封装数据方法
/**
 * [xmlEncode description]
 * @param  [type] $code    [description]
 * @param  [type] $message [description]
 * @param  array  $data    [description]
 * @return [type]          [description]
 */
class xml
{
    public static function xmlEncode($code, $message, $data = array())
    {
        if (!is_numeric($code)) {
            return;
        }
        $result = array(
            'code'    => $code,
            'message' => $message,
            'data'    => $data,
        );
        header("Content-Type:text/html");
        $xml = "<?xml version='1.0' encoding='UTF-8'>";
        $xml .= "<root>";
        $xml .= self::xmlToEncode($result);
        $xml .= "</root>";

        echo $xml;
    }


    public static function xmlToEncode($data)
    {
        $xml = $attr = "";
        foreach ($data as $key => $value) {
            //xml的节点不能为数字，如果传默认数组需要处理下标值
            if (is_numeric($key)) {
                $attr = "id='{$key}'";
                $key  = "item";
            }
            $xml .= "<{$key}>";
            $xml .= is_array($value) ? self::xmlToEncode($value) : $value;
            $xml .= "</{$key}>";
        }
        return $xml;
    }
}
$data = array(
    'id'=>1,
    'name'=>'xinlang',
    'type'=>array(),
);
echo xml::xmlEncode(200,'success',$data);


// 注意 xml的节点不能为数字，如果传默认数组需要处理下标值
// <item id="0"></item>

