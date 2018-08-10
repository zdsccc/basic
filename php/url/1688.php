<?php

// fake data
$url = "https://gw.open.1688.com/openapi/param2/1/com.alibaba.p4p/alibaba.cps.genClickUrl/4557567
" . "?type=7&mediaId=23435364565&mediaZoneId=4354567879
&objectValueList%255B0%255D=37525186037&objectValueList=%5B%2237525186037%22,%22556069531848%22%5D&ext=%7B%22p1%22:%22A100233008%22%7D&_aop_signature=B99036E05D0D99A98D8D0F21693E08D472DFB126";

echo urldecode(urldecode($url));

