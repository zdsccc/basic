<?php
/**
 * Created by PhpStorm.
 * User: yesman
 * Date: 2018/5/11
 * Time: 9:19
 */

$sql = "
INSERT INTO `product_pingou` (`mid`, `comments`, `commissionShare`, `goodCommentsShare`, `imageUrl`, `inOrderCount30Days`, `pingouPrice`, `pingouTmCount`, `pingouUrl`, `promotionUrl`, `skuId`, `skuName`, `wlPrice`, `creat_ts`, `update_ts`, `cid`, `cid2`, `cid2Name`, `cid3`, `cid3Name`, `cidName`, `commisionRatioPc`, `commisionRatioWl`, `endDate`, `goodsName`, `imgUrl`, `inOrderCount`, `isFreeFreightRisk`, `isFreeShipping`, `isJdSale`, `isSeckill`, `materialUrl`, `shopId`, `skuId2`, `startDate`, `unitPrice`, `vid`, `wlUnitPrice`)
VALUES('360buyjyg',
       '85',
       '35',
       '98',
       'jfs/t19147/321/1723071664/200187/b1cb82bd/5ad6d890N4ecd9cde.jpg',
       '55',
       '119',
       '2',
       'https://wq.jd.com/pingou_api/GetAutoTuan?sku_id=27349364308&from=cps',
       'http://union-click.jd.com/jdc?e=&p=AyIEVB5rHQAUA1ITUxULIgRTGV4dABUCVxpSJUZNXwtEa0xHV0YXEEULRFIYDk5ER1xOGRRDBENcVmkFWgMLdEZCJV8eS2dWVwoVGU9GfF8AF1gTABcPVxxeFwMbEAJYBUkOQEYXK1pVakxEPkFcd0pWZwVvB0B5Ymw2bzsZDnwEVBtSCQMWG1UaShUDGQNdEFgRMhM3VRpaFAARAFMZXCUyEgNlWjUSAxsEUR5rFDISA1YfUxYCEgBRHlwdMhsGZUYDSlhXUwdCNRcyIjdVK2slAhM3Vg%3D%3D&t=W1dCFFlQCxxUR0pADgpQTFtLWgNKVExDO0saTRxkUxBrH1Bcd0MFRFVXWFZpDU5XFgQQAl0ZXBAAEw5CTBhLXh5VFFk%3D',
       '27349364308',
       '花花公子短袖t恤男2018夏季新品休闲翻领POLO衫 男士韩版条纹体恤纯棉薄款半袖上衣服 白色9951 52/XL',
       '139',
       now(),
       now(),
       '1315',
       '1342',
       '男装',
       '1349',
       'T恤',
       '服饰内衣',
       '35',
       '35',
       '32472115200000',
       '花花公子短袖t恤男2018夏季新品休闲翻领POLO衫 男士韩版条纹体恤纯棉薄款半袖上衣服 白色9951 52/XL',
       'http://img14.360buyimg.com/n1/jfs/t19147/321/1723071664/200187/b1cb82bd/5ad6d890N4ecd9cde.jpg',
       '55',
       '0',
       '0',
       '0',
       '0',
       'http://item.jd.com/27349364308.html',
       '608254',
       '27349364308',
       '1500739200000',
       '139',
       '608254',
       '139')";

$urlencode_sql = urlencode($sql);

$arr = array(
    "type"=>"sql",
    "sql"=>$urlencode_sql
);

// 5.4- 没有 JSON_UNESCAPED_UNICODE 选项JSON_UNESCAPED_UNICODE
// 汉字json_encode后会变成unicode字符\u6409,
// 5.4-解决办法
// 对要json_encode的字符串先进行urlencode
// 再json_encode
file_put_contents("./09988.txt",json_encode($arr));

$json = "
{\"type\":\"sql\",\"sql\":\"%0D%0AINSERT+INTO+%60product_pingou%60+%28%60mid%60%2C+%60comments%60%2C+%60commissionShare%60%2C+%60goodCommentsShare%60%2C+%60imageUrl%60%2C+%60inOrderCount30Days%60%2C+%60pingouPrice%60%2C+%60pingouTmCount%60%2C+%60pingouUrl%60%2C+%60promotionUrl%60%2C+%60skuId%60%2C+%60skuName%60%2C+%60wlPrice%60%2C+%60creat_ts%60%2C+%60update_ts%60%2C+%60cid%60%2C+%60cid2%60%2C+%60cid2Name%60%2C+%60cid3%60%2C+%60cid3Name%60%2C+%60cidName%60%2C+%60commisionRatioPc%60%2C+%60commisionRatioWl%60%2C+%60endDate%60%2C+%60goodsName%60%2C+%60imgUrl%60%2C+%60inOrderCount%60%2C+%60isFreeFreightRisk%60%2C+%60isFreeShipping%60%2C+%60isJdSale%60%2C+%60isSeckill%60%2C+%60materialUrl%60%2C+%60shopId%60%2C+%60skuId2%60%2C+%60startDate%60%2C+%60unitPrice%60%2C+%60vid%60%2C+%60wlUnitPrice%60%29%0D%0AVALUES%28%27360buyjyg%27%2C%0D%0A+++++++%2785%27%2C%0D%0A+++++++%2735%27%2C%0D%0A+++++++%2798%27%2C%0D%0A+++++++%27jfs%2Ft19147%2F321%2F1723071664%2F200187%2Fb1cb82bd%2F5ad6d890N4ecd9cde.jpg%27%2C%0D%0A+++++++%2755%27%2C%0D%0A+++++++%27119%27%2C%0D%0A+++++++%272%27%2C%0D%0A+++++++%27https%3A%2F%2Fwq.jd.com%2Fpingou_api%2FGetAutoTuan%3Fsku_id%3D27349364308%26from%3Dcps%27%2C%0D%0A+++++++%27http%3A%2F%2Funion-click.jd.com%2Fjdc%3Fe%3D%26p%3DAyIEVB5rHQAUA1ITUxULIgRTGV4dABUCVxpSJUZNXwtEa0xHV0YXEEULRFIYDk5ER1xOGRRDBENcVmkFWgMLdEZCJV8eS2dWVwoVGU9GfF8AF1gTABcPVxxeFwMbEAJYBUkOQEYXK1pVakxEPkFcd0pWZwVvB0B5Ymw2bzsZDnwEVBtSCQMWG1UaShUDGQNdEFgRMhM3VRpaFAARAFMZXCUyEgNlWjUSAxsEUR5rFDISA1YfUxYCEgBRHlwdMhsGZUYDSlhXUwdCNRcyIjdVK2slAhM3Vg%253D%253D%26t%3DW1dCFFlQCxxUR0pADgpQTFtLWgNKVExDO0saTRxkUxBrH1Bcd0MFRFVXWFZpDU5XFgQQAl0ZXBAAEw5CTBhLXh5VFFk%253D%27%2C%0D%0A+++++++%2727349364308%27%2C%0D%0A+++++++%27%E8%8A%B1%E8%8A%B1%E5%85%AC%E5%AD%90%E7%9F%AD%E8%A2%96t%E6%81%A4%E7%94%B72018%E5%A4%8F%E5%AD%A3%E6%96%B0%E5%93%81%E4%BC%91%E9%97%B2%E7%BF%BB%E9%A2%86POLO%E8%A1%AB+%E7%94%B7%E5%A3%AB%E9%9F%A9%E7%89%88%E6%9D%A1%E7%BA%B9%E4%BD%93%E6%81%A4%E7%BA%AF%E6%A3%89%E8%96%84%E6%AC%BE%E5%8D%8A%E8%A2%96%E4%B8%8A%E8%A1%A3%E6%9C%8D+%E7%99%BD%E8%89%B29951+52%2FXL%27%2C%0D%0A+++++++%27139%27%2C%0D%0A+++++++now%28%29%2C%0D%0A+++++++now%28%29%2C%0D%0A+++++++%271315%27%2C%0D%0A+++++++%271342%27%2C%0D%0A+++++++%27%E7%94%B7%E8%A3%85%27%2C%0D%0A+++++++%271349%27%2C%0D%0A+++++++%27T%E6%81%A4%27%2C%0D%0A+++++++%27%E6%9C%8D%E9%A5%B0%E5%86%85%E8%A1%A3%27%2C%0D%0A+++++++%2735%27%2C%0D%0A+++++++%2735%27%2C%0D%0A+++++++%2732472115200000%27%2C%0D%0A+++++++%27%E8%8A%B1%E8%8A%B1%E5%85%AC%E5%AD%90%E7%9F%AD%E8%A2%96t%E6%81%A4%E7%94%B72018%E5%A4%8F%E5%AD%A3%E6%96%B0%E5%93%81%E4%BC%91%E9%97%B2%E7%BF%BB%E9%A2%86POLO%E8%A1%AB+%E7%94%B7%E5%A3%AB%E9%9F%A9%E7%89%88%E6%9D%A1%E7%BA%B9%E4%BD%93%E6%81%A4%E7%BA%AF%E6%A3%89%E8%96%84%E6%AC%BE%E5%8D%8A%E8%A2%96%E4%B8%8A%E8%A1%A3%E6%9C%8D+%E7%99%BD%E8%89%B29951+52%2FXL%27%2C%0D%0A+++++++%27http%3A%2F%2Fimg14.360buyimg.com%2Fn1%2Fjfs%2Ft19147%2F321%2F1723071664%2F200187%2Fb1cb82bd%2F5ad6d890N4ecd9cde.jpg%27%2C%0D%0A+++++++%2755%27%2C%0D%0A+++++++%270%27%2C%0D%0A+++++++%270%27%2C%0D%0A+++++++%270%27%2C%0D%0A+++++++%270%27%2C%0D%0A+++++++%27http%3A%2F%2Fitem.jd.com%2F27349364308.html%27%2C%0D%0A+++++++%27608254%27%2C%0D%0A+++++++%2727349364308%27%2C%0D%0A+++++++%271500739200000%27%2C%0D%0A+++++++%27139%27%2C%0D%0A+++++++%27608254%27%2C%0D%0A+++++++%27139%27%29\"}
";
$parsed_json_arr = json_decode($json,true);
echo "<pre>";
var_dump(urldecode($parsed_json_arr["sql"]));

