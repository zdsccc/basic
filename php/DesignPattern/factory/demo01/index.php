<?php
include "./SimpleFactory.class.php";

$factory = new SimpleFactory();

$bicycle = $factory->createBicycle();

echo $bicycle->driveTo("Paris");

