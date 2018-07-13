<?php

  include 'Idraw.php';
  
  $arr = array (
   array(130,100),
   array(131,100),
   array(465,105),
   array(9997,200),
   array(5000,600),
   array(7000,200),
   array(6000,600),
   array(8000,400),
   
);

 $arr1 = array (
   array(130,100),
   array(8001,900),
   array(8500,1800),
 );

  
 $draw1 = new Idraw();
 $draw1->putIn($arr);
 $draw1->putIn($arr1);
 $draw1->getOut("image","yes1");
 echo "<img src='image/yes1.png'/>";
 ///home/m/Dev/cvs/ImRoBot5/spider2/newshive/admin
 
 
 
    ?>