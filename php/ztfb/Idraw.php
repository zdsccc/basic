<?php
 include 'draw.php';
 class Idraw extends Draw{    
     private $arr = array ();
     private $arr1 = array ();
     private $arrT = array ();
      
    function putIn($arr){
        $counts = count($arr);
        $avr = $this->sets['max']['x']/($this->sets['lengths']['x']/$this->sets['width']);    
        for ($i=0;$i < $counts;$i++){           
           $mod = (int)($arr[$i][0]/$avr);                 
           if(!in_array($mod, $this->arr)){           
               array_push($this->arr, $mod);
               array_push($this->arr1, $arr[$i][1]);
           } 
           else {  
                  $key = array_search($mod,$this->arr);
                  $this->arr1[$key] = ($this->arr1[$key]+$arr[$i][1]);     
           }                 
        }
        //echo $this->arr1[0];
    }
     
    function getOut($address, $name){
        $this->arrT();
        $this->drawArr($this->arrT);
        return $this->done($address, $name);
    }
    
    private function  arrT(){
        $counts = count($this->arr);
        for ($i=0;$i < $counts;$i++){
            $arr = array ($this->arr[$i],$this->arr1[$i]);
            array_push($this->arrT, $arr);          
        }     
    }
     
 }