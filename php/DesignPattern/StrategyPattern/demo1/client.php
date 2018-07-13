<?php
spl_autoload_register(function($classname){
    if(file_exists("classes/" . $classname . ".interface.php")){
        require_once $classname . ".interface.php";
    }else if(file_exists($classname . ".class.php")){
        require_once $classname . ".class.php";
    }else {
        throw new Exception("Unable to load " . $classname . "文件");
    }
});

try {
    $strategy = new Mine2(new byBus());
    $strategy->goTravel();

    $strategy->change(new byAirplane());
    $strategy->goTravel();
}catch(Exception $e){
    echo $e->getMessage();
}



