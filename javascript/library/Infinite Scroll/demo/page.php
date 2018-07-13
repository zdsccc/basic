<?php
/**
 * Created by PhpStorm.
 * User: hiyesman
 * Date: 2018/1/17
 * Time: 21:40
 */
$pagenum = $_GET["page"];
$start = $pagenum * 10;
$limit = " limit $start,100";

$mysqli = new mysqli("localhost", "root", "", "linktech");

/* check connection */
if ($mysqli->connect_errno) {
    printf("Connect failed: %s\n", $mysqli->connect_error);
    exit();
}
$mysqli->set_charset("utf8");
$query = "select product_id from product_jyg $limit";

if ($result = $mysqli->query($query)) {

    /* fetch associative array */
    while ($row = $result->fetch_assoc()) {
        $pid = $row["product_id"];
        $data[] = "<a href='detail.php?pid=$pid'>$pid</a><br />";
    }

    /* free result set */
    $result->free();
}

/* close connection */
$mysqli->close();
$nowpage = $pagenum + 1;
echo "<div class='post' pagenum = '$nowpage'>".implode('',$data).str_repeat($nowpage,30)."</div>";



