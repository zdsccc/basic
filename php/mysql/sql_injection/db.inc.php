<?php
    error_reporting(E_ALL);
    mysql_connect('localhost','root', '');
    mysql_select_db('test');
    
    //Displays and runs the given query and displays either the returned error 
    //  or all returned rows
    function RunQuery($query) {
        echo "<b>SQL query:</b> $query";
        $result = mysql_query($query);
        if ($result) {
            echo "<br><b>SQL results:</b>";
            $bHeader = false;
            while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
                if (!$bHeader) {
                    $bHeader = true;
                    echo '<table border=1><tr>';
                    foreach ($row as $k=>$v)
                        echo "<th>$k</th>";
                    echo '</tr>';
                }
                echo '<tr>';
                foreach ($row as $v)
                    echo "<tD>$v</td>";
                echo '</tr>';
            }
            if ($bHeader) echo '</table>';
        } else {
            print("<br><b>SQL error:</b> ". mysql_error());
        }
    }
    function PrintLink($link) {
        static $counter = 1;
        echo "\n<br><a href=\"?$link\">$counter. $link</a>";
        ++$counter;
    }
    function PrintSource() {
        $f = file_get_contents(basename($_SERVER['PHP_SELF']));
        preg_match('~<\?php(.*?)\?>~is', $f, $aMatches);
        echo '<hr><b>Essential source snippet:</b><br>';
        highlight_string($aMatches[0]);
    }
    
?>
