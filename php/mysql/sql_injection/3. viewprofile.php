<?php
    require_once('db.inc.php');
    $userid = isset($_GET['id']) ? $_GET['id'] : 0;
    $userid = mysql_real_escape_string($userid);
    RunQuery("SELECT userid, username FROM sql_injection_test WHERE userid=$userid");
?>
<hr><b>Test links:</b><br>
<?php
    
    PrintLink("id=0");
    PrintLink("id=1");
    PrintLink("id=2");
    PrintLink("id=3");
    PrintLink("id='");
    PrintLink("id=0 or 1");
    PrintLink("id=0 UNION ALL SELECT userid, CONCAT(username, ' ', password) FROM sql_injection_test WHERE 1");
    PrintLink("id=0 UNION ALL SELECT userid, CONCAT(username, CHAR(32), password) FROM sql_injection_test WHERE 1");
    PrintSource();
?>
