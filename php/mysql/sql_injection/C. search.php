<?php
    require_once('db.inc.php');
    $search = isset($_GET['s']) ? $_GET['s'] : '';
    if ($search!='')  {
        $search = mysql_real_escape_string($search);
        RunQuery("EXPLAIN SELECT userid, username FROM sql_injection_test WHERE `username` LIKE '$search%'");
    }
?>
<hr><b>Test links:</b><br>
<?php
    PrintLink("s=Wi");
    PrintLink("s=%Wi");
    PrintSource();
?>
