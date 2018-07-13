<?php
echo "<pre>";
var_dump($_SERVER);
var_dump($_ENV);

putenv("linktech=chuntianlaile");

echo getenv("linktech"), "<br />";

var_dump($_SERVER);
var_dump($_ENV);
