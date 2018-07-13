<?php
    $nFrame = intval(isset($_GET['frame']) ? $_GET['frame'] : 0);
    switch ($nFrame) {
        default:
        case 0:
            ?>
            <frameset cols="250, *">
                <frame src="?frame=1">
                <frame name="content" src="?frame=2">
            </frameset>
            <?php
        break;
        case 1:
            echo "Select an example to be loaded in the frame [or in a new window]:<br><Br>";
            $a = glob('?.*.php');
            foreach ($a as $f)
                echo "<a target='content' href='$f'>$f</a>&nbsp;&nbsp;&nbsp;<a target='_blank' href='$f'>[new]</a><br>";
        break;
        case 2:
            
        break;
    }
?>
