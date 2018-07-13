<?php
    require_once('db.inc.php');
    $username = isset($_GET['u']) ? $_GET['u'] : '';
    $username = mysql_real_escape_string($username);
    RunQuery("SELECT `userid`, `username` FROM `sql_injection_test` WHERE `username` = '$username'");
?>
<hr><b>Test links:</b><br>
<?php

    PrintLink("u=Winnie");
    PrintLink("u=Edward");
    PrintLink("u=Christopher");
    PrintLink("u=Schneier");
    PrintLink("u='");
    PrintLink("u=' OR ''='");
    PrintLink("u=' UNION ALL SELECT userid, CONCAT(username, ' ', password) FROM sql_injection_test WHERE ''='");
    PrintSource();
?>
