<?
function GetIP()
{
    // 获取IP
    if ($_SERVER["HTTP_X_FORWARDED_FOR"])
        $ip = $_SERVER["HTTP_X_FORWARDED_FOR"];
    else if ($_SERVER["HTTP_CLIENT_IP"])
        $ip = $_SERVER["HTTP_CLIENT_IP"];
    else if ($_SERVER["REMOTE_ADDR"])
        $ip = $_SERVER["REMOTE_ADDR"];
    else if (getenv("HTTP_X_FORWARDED_FOR"))
        $ip = getenv("HTTP_X_FORWARDED_FOR");
    else if (getenv("HTTP_CLIENT_IP"))
        $ip = getenv("HTTP_CLIENT_IP");
    else if (getenv("REMOTE_ADDR"))
        $ip = getenv("REMOTE_ADDR");
    else
        $ip = "Unknown";
    return $ip;
}
?>

<?php
function DateAdd($date, $int, $unit = "d") {
    //时间的增加(还可以改进成时分秒都可以增加,有时间再补上)
    $dateArr = explode("-", $date);
    $value[$unit] = $int;
    return date("Y-m-d", mktime(0,0,0, $dateArr[1] + $value['m'], $dateArr[2] + $value['d'], $dateArr[0] + $value['y']));
}
function GetWeekDay($date) {
    //计算出给出的日期是星期几
    $dateArr = explode("-", $date);
    return date("w", mktime(0,0,0,$dateArr[1],$dateArr[2],$dateArr[0]));
}
?>
<? function check_date($date) { //检查日期是否合法日期 $dateArr = explode("-", $date); if (is_numeric($dateArr[0]) &;&; is_numeric($dateArr[1]) &;&; is_numeric($dateArr[2])) { return checkdate($dateArr[1],$dateArr[2],$dateArr[0]); } return false; } function check_time($time) { //检查时间是否合法时间 $timeArr = explode(":", $time); if (is_numeric($timeArr[0]) &;&; is_numeric($timeArr[1]) &;&; is_numeric($timeArr[2])) { if (($timeArr[0] >= 0 &;&; $timeArr[0] <= 23) &;&; ($timeArr[1] >= 0 &;&; $timeArr[1] <= 59) &;&; ($timeArr[2] >= 0 &;&; $timeArr[2] <= 59)) return true; else return false; } return false; }
            function DateDiff($date1, $date2, $unit = "") { //时间比较函数,返回两个日期相差几秒、几分钟、几小时或几天 switch ($unit) { case 's': $dividend = 1; break; case 'i': $dividend = 60; break; case 'h': $dividend = 3600; break; case 'd': $dividend = 86400; break; default: $dividend = 86400; } $time1 = strtotime($date1); $time2 = strtotime($date2); if ($time1 &;&; $time2) return (float)($time1 - $time2) / $dividend; return false; } ?>
                PHP重定向
                <? 方法一:header("Location: index.php"); 方法二:echo "<scrīpt>window.location ="$PHP_SELF";</scrīpt>"; 方法三:echo "<META HTTP-EQUIV="Refresh" CONTENT="0; URL=index.php">"; ?>
                获取访问者浏览器
                <? function browse_infor() { $browser="";$browserver=""; $Browsers =array("Lynx","MOSAIC","AOL","Opera","JAVA","MacWeb","WebExplorer","OmniWeb"); $Agent = $GLOBALS["HTTP_USER_AGENT"]; for ($i=0; $i<=7; $i++) { if (strpos($Agent,$Browsers[$i])) { $browser = $Browsers[$i]; $browserver =""; } } if (ereg("Mozilla",$Agent) &;&; !ereg("MSIE",$Agent)) { $temp =explode("(", $Agent); $Part=$temp[0]; $temp =explode("/", $Part); $browserver=$temp[1]; $temp =explode(" ",$browserver); $browserver=$temp[0]; $browserver =preg_replace("/([d.]+)/","1",$browserver); $browserver = " $browserver"; $browser = "Netscape Navigator"; } if (ereg("Mozilla",$Agent) &;&; ereg("Opera",$Agent)) { $temp =explode("(", $Agent); $Part=$temp[1]; $temp =explode(")", $Part); $browserver=$temp[1]; $temp =explode(" ",$browserver);$browserver=$temp[2]; $browserver =preg_replace("/([d.]+)/","1",$browserver); $browserver = " $browserver"; $browser = "Opera"; } if (ereg("Mozilla",$Agent) &;&; ereg("MSIE",$Agent)) { $temp = explode("(", $Agent); $Part=$temp[1]; $temp = explode(";",$Part); $Part=$temp[1]; $temp = explode(" ",$Part);$browserver=$temp[2]; $browserver =preg_replace("/([d.]+)/","1",$browserver); $browserver = " $browserver"; $browser = "Internet Explorer"; } if ($browser!="") { $browseinfo = "$browser$browserver"; } else { $browseinfo = "Unknown"; } return $browseinfo; } //调用方法$browser=browseinfo() ;直接返回结果 ?>
                获取访问者操作系统
                <? function osinfo() { $os=""; $Agent = $GLOBALS["HTTP_USER_AGENT"]; if (eregi('win',$Agent) &;&; strpos($Agent, '95')) { $os="Windows 95"; } elseif (eregi('win 9x',$Agent) &;&; strpos($Agent, '4.90')) { $os="Windows ME"; } elseif (eregi('win',$Agent) &;&; ereg('98',$Agent)) { $os="Windows 98"; } elseif (eregi('win',$Agent) &;&; eregi('nt 5.0',$Agent)) { $os="Windows 2000"; } elseif (eregi('win',$Agent) &;&; eregi('nt',$Agent)) { $os="Windows NT"; } elseif (eregi('win',$Agent) &;&; eregi('nt 5.1',$Agent)) { $os="Windows XP"; } elseif (eregi('win',$Agent) &;&; ereg('32',$Agent)) { $os="Windows 32"; } elseif (eregi('linux',$Agent)) { $os="Linux"; } elseif (eregi('unix',$Agent)) { $os="Unix"; } elseif (eregi('sun',$Agent) &;&; eregi('os',$Agent)) { $os="SunOS"; } elseif (eregi('ibm',$Agent) &;&; eregi('os',$Agent)) { $os="IBM OS/2"; } elseif (eregi('Mac',$Agent) &;&; eregi('PC',$Agent)) { $os="Macintosh"; } elseif (eregi('PowerPC',$Agent)) { $os="PowerPC"; } elseif (eregi('AIX',$Agent)) { $os="AIX"; } elseif (eregi('HPUX',$Agent)) { $os="HPUX"; } elseif (eregi('NetBSD',$Agent)) { $os="NetBSD"; } elseif (eregi('BSD',$Agent)) { $os="BSD"; } elseif (ereg('OSF1',$Agent)) { $os="OSF1"; } elseif (ereg('IRIX',$Agent)) { $os="IRIX"; } elseif (eregi('FreeBSD',$Agent)) { $os="FreeBSD"; } if ($os=='') $os = "Unknown"; return $os; } //调用方法$os=os_infor() ; ?>
                文件格式类
                <? $mime_types = array( 'gif' => 'image/gif', 'jpg' => 'image/jpeg', 'jpeg' => 'image/jpeg', 'jpe' => 'image/jpeg', 'bmp' => 'image/bmp', 'png' => 'image/png', 'tif' => 'image/tiff', 'tiff' => 'image/tiff', 'pict' => 'image/x-pict', 'pic' => 'image/x-pict', 'pct' => 'image/x-pict', 'tif' => 'image/tiff', 'tiff' => 'image/tiff', 'psd' => 'image/x-photoshop', 'swf' => 'application/x-shockwave-flash', 'js' => 'application/x-javascrīpt', 'pdf' => 'application/pdf', 'ps' => 'application/postscrīpt', 'eps' => 'application/postscrīpt', 'ai' => 'application/postscrīpt', 'wmf' => 'application/x-msmetafile', 'css' => 'text/css', 'htm' => 'text/html', 'html' => 'text/html', 'txt' => 'text/plain', 'xml' => 'text/xml', 'wml' => 'text/wml', 'wbmp' => 'image/vnd.wap.wbmp', 'mid' => 'audio/midi', 'wav' => 'audio/wav', 'mp3' => 'audio/mpeg', 'mp2' => 'audio/mpeg', 'avi' => 'video/x-msvideo', 'mpeg' => 'video/mpeg', 'mpg' => 'video/mpeg', 'qt' => 'video/quicktime', 'mov' => 'video/quicktime', 'lha' => 'application/x-lha', 'lzh' => 'application/x-lha', 'z' => 'application/x-compress', 'gtar' => 'application/x-gtar', 'gz' => 'application/x-gzip', 'gzip' => 'application/x-gzip', 'tgz' => 'application/x-gzip', 'tar' => 'application/x-tar', 'bz2' => 'application/bzip2', 'zip' => 'application/zip', 'arj' => 'application/x-arj', 'rar' => 'application/x-rar-compressed', 'hqx' => 'application/mac-binhex40', 'sit' => 'application/x-stuffit', 'bin' => 'application/x-macbinary', 'uu' => 'text/x-uuencode', 'uue' => 'text/x-uuencode', 'latex'=> 'application/x-latex', 'ltx' => 'application/x-latex', 'tcl' => 'application/x-tcl', 'pgp' => 'application/pgp', 'asc' => 'application/pgp', 'exe' => 'application/x-msdownload', 'doc' => 'application/msword', 'rtf' => 'application/rtf', 'xls' => 'application/vnd.ms-excel', 'ppt' => 'application/vnd.ms-powerpoint', 'mdb' => 'application/x-msaccess', 'wri' => 'application/x-mswrite', ); ?>
                php生成excel文档
<?
header("Content-type:application/vnd.ms-excel");
header("Content-Disposition:filename=test.xls");
echo "test1t";
echo "test2tn";
echo "test1t";
echo "test2tn";
echo "test1t";
echo "test2tn";
echo "test1t";
echo "test2tn";
echo "test1t";
echo "test2tn";
echo "test1t";
echo "test2tn";
//改动相应文件头就可以输出.doc .xls等文件格式了
?>
时间比较问题
举一个简单例子说明:比如一个论坛对当天发表的贴子用new图片标记一下。
方法一:
<? //$db->rows[$i][date]中为数据库中datetime字段值. $today=time(); $theDay=date("Y-m-d H:i:s",$today-24*3600); $newTag=$db->rows[$i][date]>=$theDay?"<img src='../image/newinfor.gif'>":""; //方法二: $newTag=$db->rows[$i][date]>=date("Y-m-d 00:00:00")?"<img src='../image/newinfor.gif'>":""; ?>
//提取页面和浏览器提交的变量,作用相当于使PHP.INI开了全局变量 <? @extract($_SERVER, EXTR_SKIP); @extract($_SESSION, EXTR_SKIP); @extract($_POST, EXTR_SKIP); @extract($_FILES, EXTR_SKIP); @extract($_GET, EXTR_SKIP); @extract($_ENV, EXTR_SKIP); ?>
//读取文件函数 <? function readfromfile($file_name) { if (file_exists($file_name)) { $filenum=fopen($file_name,"r"); flock($filenum,LOCK_EX); $file_data=fread($filenum, filesize($file_name)); rewind($filenum); fclose($filenum); return $file_data; } } ?>
//写入文件函数 <? function writetofile($file_name,$data,$method="w") { $filenum=fopen($file_name,$method); flock($filenum,LOCK_EX); $file_data=fwrite($filenum,$data); fclose($filenum); return $file_data; } ?>
//页面快速转向 <? function turntopage($url="index.php",$info = "页面转向中...",$second=2){ print "<html>n<head>n<title>页面转向中....</title>n"; print "<meta http-equiv="refresh" content="$second;url=$url">n"; print "<style type="text/css">n<!--n"; print "td { font-family: "Verdana", "Arial";font-size: 12px}n"; print "A {COLOR: #000000; TEXT-DECORATION: none}n"; print "-->n</style>n"; print "</head>n<body>n"; print "<table width="100%" border="0" align="center">n"; print " <tr>n"; print " <td height="200"> </td>n"; print " </tr>n"; print " <tr>n"; print " <td align="center">n"; print " <table width="60%" border="0" cellpadding="8" bgcolor="#AA9FFF">n"; print " <tr>n"; print " <td height="30" align="center">页面转向提示信息</td>n"; print " </tr>n"; print " <tr>n"; print " <td align="center">$info</td>n"; print " </tr>n"; print " <tr>n"; print " <td align="center">n"; print " <a href="$url">如果你的浏览器不支持自动跳转,请按这里</a></td>n"; print " </tr>n"; print " </tr>n"; print " </table></td>n"; print " </tr>n"; print " <tr>n"; print " <td height="200"> </td>n"; print " </tr>n"; print "</table>n"; print "</body>n</html>"; exit; ?>
产生随机字符串函数
<?
function random($length) {
    $hash = @#@#;
    #$chars = @#ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwaliyunzixun@xxx.com#;
    #$max = strlen($chars) - 1;
    #mt_srand((double)microtime() * 1000000);
    #for($i = 0; $i < $length; $i++) {
    #$hash .= $chars[mt_rand(0, $max)];
    #
    #}
    #return $hash; } ?>
截取一定长度的字符串(该函数对GB2312使用有效)
<? function Wordscut($string, $length ,$sss=0) { if(strlen($string) > $length) { if($sss){ $length=$length - 3; aliyunzixun@xxx.com# aliyunzixun@xxx.com#; } for($i = 0; $i < $length; $i++) { if(ord($string[$i]) > 127) { $wordscut .= $string[$i].$string[$i + 1]; $i++; } else { $wordscut .= $string[$i]; } } return $wordscut.$addstr; } return $string; } ?>
取得客户端IP地址
<? function GetIP(){ if (getenv("HTTP_CLIENT_IP") &;&; strcasecmp(getenv("HTTP_CLIENT_IP"), "unknown")) $ip = getenv("HTTP_CLIENT_IP"); else if (getenv("HTTP_X_FORWARDED_FOR") &;&; strcasecmp(getenv("HTTP_X_FORWARDED_FOR"), "unknown")) $ip = getenv("HTTP_X_FORWARDED_FOR"); else if (getenv("REMOTE_ADDR") &;&; strcasecmp(getenv("REMOTE_ADDR"), "unknown")) $ip = getenv("REMOTE_ADDR"); else if (isset($_SERVER[@#aliyunzixun@xxx.com#]) &;&; $_SERVER[@#aliyunzixun@xxx.com#] &;&; strcasecmp($_SERVER[@#aliyunzixun@xxx.com#], "unknown")) $ip = $_SERVER[@#aliyunzixun@xxx.com#]; else $ip = "unknown"; return($ip); } ?>
判断邮箱地址
<? function checkEmail($inAddress) { return (ereg("^([a-zA-Z0-9_-])aliyunzixun@xxx.com([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+",$inAddress)); } ?>
分页(两个函数配合使用)
<? function getpage($sql,$page_size=20) { global $page,$totalpage,$sums; //out param $page = $_GET["page"]; //$eachpage = $page_size; $pagesql = strstr($sql," from "); $pagesql = "select count(*) as ids ".$pagesql; $result = mysql_query($pagesql); if($rs = mysql_fetch_array($result)) $sums = $rs[0]; $totalpage = ceil($sums/$page_size); if((!$page)($page<1)) $page=1; $startpos = ($page-1)*$page_size; $sql .=" limit $startpos,$page_size "; return $sql; } function showbar($string="") { global $page,$totalpage; $out="共<font ".$totalpage."aliyunzixun@xxx.com#aliyunzixun@xxx.com#><b>".$totalpage."</b>页 "; $linkNum =4; $start = ($page-round($linkNum/2))>0 ? ($page-round($linkNum/2)) : "1"; $end = ($page+round($linkNum/2))<$totalpage ? ($page+round($linkNum/2)) : $totalpage; $prestart=$start-1; $nextend=$end+1; if($page<>1) $out .= "<a aliyunzixun@xxx.com#?page=1&;&;".$string."@#title=第一页>第一页</a> "; if($start>1) $out.="<a aliyunzixun@xxx.com#?page=".$prestart."@# title=上一页>..<<</a> "; for($t=$start;$t<=$end;$t++) { $out .= ($page==$t) ? "<font [".$t."]aliyunzixun@xxx.com#aliyunzixun@xxx.com#><b>[".$t."]</b> " : "<a aliyunzixun@xxx.com#?page=$t&;&;".$string."@#>$t</a> "; } if($end<$totalpage) $out.="<a aliyunzixun@xxx.com#?page=".$nextend."&;&;".$string."@# title=下一页>>>..</a>"; if($page<>$totalpage) $out .= " <a aliyunzixun@xxx.com#?page=".$totalpage."&;&;".$string."@# title=最后页>最后页</a>"; return $out; } ?>
获取新插入数据的ID
<? mysql_insert_id(); ?>
//获得当前的脚本网址 <? function get_php_url(){ if(!empty($_server["REQUEST_URI"])){ $scriptName = $_SERVER["REQUEST_URI"]; $nowurl = $scriptName; }else{ $scriptName = $_SERVER["PHP_SELF"]; if(empty($_SERVER["QUERY_STRING"])) $nowurl = $scriptName; else $nowurl = $scriptName."?".$_SERVER["QUERY_STRING"]; } return $nowurl; } ?>
//把全角数字转为半角数字
<?
function GetAlabNum($fnum){
    $nums = array("0","1","2","3","4","5","6","7","8","9");
    $fnums = "0123456789";
    for($i=0;$i<=9;$i++)
        $fnum = str_replace($nums[$i],$fnums[$i],$fnum);
    $fnum = ereg_replace("[^0-9.]|^0{1,}","",$fnum);
    if($fnum=="")
        $fnum=0;
    return $fnum;
}
?>
                                    }
//去除HTML标记 <? function Text2Html($txt){ $txt = str_replace(" "," ",$txt); $txt = str_replace("<","<",$txt); $txt = str_replace(">",">",$txt); $txt = preg_replace("/[rn]{1,}/isU"," rn",$txt); return $txt; } ?>
//相对路径转化成绝对路径
<?
function relative_to_absolute($content, $feed_url) {
    preg_match('/(http|https|ftp):///', $feed_url, $protocol);
    $server_url = preg_replace("/(http|https|ftp|news):///", "", $feed_url);
    $server_url = preg_replace("//.*/", "", $server_url);
    if ($server_url == '') {
        return $content;
    }
    if (isset($protocol[0])) {
        $new_content = preg_replace('/href="//', 'href="'.$protocol[0].$server_url.'/', $content);
        $new_content = preg_replace('/src="//', 'src="'.$protocol[0].$server_url.'/', $new_content);
    } else {
        $new_content = $content;
    }
    return $new_content;
}
?>
//取得所有链接 <? function get_all_url($code){ preg_match_all('/<as+href=["|']?([^>"' ]+)["|']?s*[^>]*>([^>]+)</a>/i',$code,$arr); return array('name'=>$arr[2],'url'=>$arr[1]); } ?>
//HTML表格的每行转为CSV格式数组 <? function get_tr_array($table) { $table = preg_replace("'<td[^>]*?>'si",'"',$table); $table = str_replace("</td>",'",',$table); $table = str_replace("</tr>","{tr}",$table); //去掉 HTML 标记 $table = preg_replace("'<[/!]*?[^<>]*?>'si","",$table); //去掉空白字符 $table = preg_replace("'([rn])[s]+'","",$table); $table = str_replace(" ","",$table); $table = str_replace(" ","",$table); $table = explode(",{tr}",$table); array_pop($table); return $table; } ?>
//将HTML表格的每行每列转为数组,采集表格数据 <? function get_td_array($table) { $table = preg_replace("'<table[^>]*?>'si","",$table); $table = preg_replace("'<tr[^>]*?>'si","",$table); $table = preg_replace("'<td[^>]*?>'si","",$table); $table = str_replace("</tr>","{tr}",$table); $table = str_replace("</td>","{td}",$table); //去掉 HTML 标记 $table = preg_replace("'<[/!]*?[^<>]*?>'si","",$table); //去掉空白字符 $table = preg_replace("'([rn])[s]+'","",$table); $table = str_replace(" ","",$table); $table = str_replace(" ","",$table); $table = explode('{tr}', $table); array_pop($table); foreach ($table as $key=>$tr) { $td = explode('{td}', $tr); array_pop($td); $td_array[] = $td; } return $td_array; } ?>
//返回字符串中的所有单词 $distinct=true 去除重复
<?
function split_en_str($str,$distinct=true) {
    preg_match_all('/([a-zA-Z]+)/',$str,$match);
    if ($distinct == true) {
        $match[1] = array_unique($match[1]);
    }
    sort($match[1]);
    return $match[1];
}
?>
//打印出为本PHP项目做出贡献的人员的清单
<? string phpcredits(void) ?>