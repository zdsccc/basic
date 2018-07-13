<?php
$acc = '2';
?>
<script>
    // 被解析为 if () {},没有要判断的条件表达式
    //if (<?//= $acc == '1' ?>//) {
    if (<?= $acc ?> == '1') {
        console.log("zou");
    } else {
        console.log("que");
    }
</script>