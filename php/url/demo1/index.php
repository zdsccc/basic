<?php
include "./encode.php";
?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>跳转吧</title>
</head>
<body>
    <a href="decode.php?id=1234&key=<?=keymaker('123')?>">
        走起
    </a>
</body>
</html>