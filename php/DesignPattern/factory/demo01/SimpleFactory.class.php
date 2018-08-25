<?php
include "./Bicycle.class.php";

class SimpleFactory
{
    public function createBicycle() // : Bicycle
    {
        return new Bicycle();
    }
}

