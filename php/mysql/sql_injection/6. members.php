<?php
    require_once('db.inc.php');
    $offset = isset($_GET['o']) ? $_GET['o'] : 0;
    $offset = mysql_real_escape_string($offset);
    RunQuery("SELECT userid, username FROM sql_injection_test LIMIT $offset, 10");
?>
<hr><b>Test links:</b><br>
<?php
    
    PrintLink("o=0");
    PrintLink("o=1");
    PrintLink("o=2");
    PrintLink("o=3");
    PrintLink("o='");
    PrintLink("o=999999, 10 UNION ALL SELECT username, password FROM sql_injection_test LIMIT 0");
    PrintSource();
?>
