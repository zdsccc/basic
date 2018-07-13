php 服务器端解决json_decode() bug 问题:
问题描述: json_decode() 转换json字符串时输出结果为 null,函数返回值为false
出现问题的分析:
1. 有可能是我们在使用插件的时候,插件对数据处理是添加了一些额外的符号，而这种符号对于json_decode来讲
是属于非法字符或者符号
2. 有可能是我们在提交数据的时候额外提交了空格、换行符
3. 有可能是数据中有多余的 , 逗号
4. 有可能是单双引号编译错误
5. 有可能是无知名的错误字符无法进行转义
6. json不支持gbk编码，也就是说数据的编码错误

解决问题的方法:
1. 建议重新封装json_encode()   json_decode()
重新封装的主要目的在于解决编码与字符安全问题
function  _json_encode($data,$option=null){
return  htmlentities(urlencode(json_encode($data,$option)));
}

function _json_decode($json_str,$assoc=true){
return  json_decode(urldecode(html_entity_decode($json_str)),$assoc);
}


2. 在json_decode之前先进行错误排除,使其返回的数据符号json_decode编译规则

格式化错误的json数据，使其能被json_decode()解析
不支持健名有中文、引号、花括号、冒号
不支持健指有冒号*
function format_ErrorJson($data,$quotes_key=false)
{
$con = str_replace('\'', '"', $data);//替换单引号为双引号
$con = str_replace(array('\\"'), array('<|YH|>'), $con);//替换
$con = preg_replace('/(\w+):[ {]?((?<YinHao>"?).*?\k<YinHao>[,}]?)/is', '"$1": $2', $con);//若键名没有双引号则添加
        if ($quotes_key) {
        $con = preg_replace('/("\w+"): ?([^"\s]+)([,}])[\s]?/is', '$1: "$2"$3', $con);//给键值添加双引号
        }
        $con = str_replace(array('<|YH|>'), array('\\"'), $con);//还原替换
        return $con;
        }