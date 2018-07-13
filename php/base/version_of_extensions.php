<?php
/**
 * Created by PhpStorm.
 * User: yesman
 * Date: 2018/5/16
 * Time: 10:49
 */

// 获取所有已加载扩展的版本信息

//foreach (get_loaded_extensions() as $i => $ext)
//{
//    echo $ext .' => '. phpversion($ext), '<br/>';
//}

echo "<pre>";
var_dump(get_extensions_version ());

function get_extensions_version ()
{
    $extensions_version_array = array();
    foreach (get_loaded_extensions() as $i => $ext)
    {
        $extensions_version_array[$ext] = phpversion($ext);
    }
    return $extensions_version_array;
}

?>
