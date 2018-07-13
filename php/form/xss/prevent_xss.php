<?php
$html = "<a href='fletch.html'>steve's favorite movie.</a><br />";
// 双引号
print htmlspecialchars($html);
// 双引号和单引号
print htmlspecialchars($html, ENT_QUOTES);
// 非单引号和双引号
print htmlspecialchars($html, ENT_NOQUOTES);
