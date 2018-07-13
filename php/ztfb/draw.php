<?php
 class Draw{
 private $im,$stu=FALSE;  //
 protected   $sets = array (    //可设置参数
         "size" => array (    //图像大小 
             "width" => 900,
             "height" => 700 
           ),               
         "position" => array (  //圆点位置
             "x" =>50,
             "y" =>50
          ),                 
         "lengths" => array (   //x,y轴长
             "x" => 800,
             "y" => 600
          ),                
         "avr" => array (   //x,y 轴刻度数量
             "x" =>20,
             "y" =>10
          ), 
         "max" => array (   //x,y 最大值
             "x" =>10000,
             "y" =>1000
          ),         
         "width" => 1,  //柱状图宽 
         "color" => array (   //x,y 轴刻度数量
             "shapcolor" =>array (0,0,0),  //柱形图颜色
             "xline" =>array (0,0,0),    //x轴颜色
             "xlineK" =>array (0,0,0),    //x轴标记
             "xlineW" =>array (0,0,0),    //x轴文字
             "yline" =>array (0,0,0),    //y轴颜色
             "ylineK" =>array (0,0,0),    //y轴标记
             "ylineW" =>array (0,0,0),    //x轴文字
             "background" =>array (255,255,255)  //背景色
          ),
          
          "words" => array (   //文字与xy轴距离
             "down" =>40,  
             "left" =>40
          ),       
      ) ;
   
   protected function drawArr($arr){      //取数组直画柱形图
         if ($this->stu==FALSE){
               $this->prepare();
         }
         $shape1 = $this->sets['color']['shapcolor'];
         $shape = imagecolorallocate($this->im,$shape1[0],$shape1[1],$shape1[2]);
         $x = $this->sets['position']['x'];
         $y = $this->sets['size']['height'] - $this->sets['position']['y'];     
         $h = $this->sets['max']['y']/$this->sets['lengths']['y'];
      $counts = count($arr);
      
      $xlineW1 = $this->sets['color']['xlineW'];
      $xlineW = imagecolorallocate($this->im,$xlineW1[0],$xlineW1[1],$xlineW1[2]);
      for ($i=0;$i<$counts;$i++){  //循环绘画出柱状图
             $x1 = $arr[$i][0]+$x;
             
             if(($arr[$i][1]/$h)<=$this->sets['lengths']['y']){
             imagefilledrectangle($this->im,$x1,$y,($x1+$this->sets['width']),($y-$arr[$i][1]/$h),$shape);   
             }
             else {
                  $arr1 = $this->sets['lengths']['y'];
                  imagefilledrectangle($this->im,$x1,$y,($x1+$this->sets['width']),($y-$arr1),$shape);
                 // imagestring($this->im,2,$x1,$y-$num,$arr[$i][1],$ylineW); //越界写上值
                  imagestringup($this->im,2,$x1,($y-$arr1),$arr[$i][1],$xlineW);  //数值
             }
          
      }             
   }
   
   protected function done($address,$name){  //输出 
        imagepng($this->im,$address."/".$name.".png");
      imagedestroy($this->im);
      return $address."/".$name.".png";     
   }
   
   private function prepare(){      //绘图准备
      $x = $this->sets['position']['x'];
      $y = $this->sets['size']['height']-$this->sets['position']['y'];
      $this->im = imagecreate($this->sets['size']['width'],$this->sets['size']['height']);    
      $black1 = $this->sets['color']['background'];    
      $black = imagecolorallocate($this->im,$black1[0],$black1[1],$black1[2]);  
      $xline1 = $shape1 = $this->sets['color']['xline'];
      $xline = imagecolorallocate($this->im, $xline1[0],$xline1[1],$xline1[2]);
      $yline1 = $shape1 = $this->sets['color']['yline'];
      $yline = imagecolorallocate($this->im,$yline1[0],$yline1[1],$yline1[2]);
      $yellow = imagecolorallocate($this->im,255,255,0);         
      imageline($this->im,$x,$y,($x+$this->sets['lengths']['x']),$y,$xline);  //画x轴         
      imageline($this->im,$x,$y,$x,($y-$this->sets['lengths']['y']),$yline);  //画y轴  
      $this->drawY();
      $this->drawX();
      $this->stu=TRUE;     
   }
   
   private function drawY(){  //循环画y轴刻度 
         $kedu = (int)($this->sets['lengths']['y']/$this->sets['avr']['y']);
         $kedu1 = (int)($this->sets['max']['y']/$this->sets['avr']['y']);
         $ylineW1 = $this->sets['color']['ylineW'];
         $ylineW = imagecolorallocate($this->im,$ylineW1[0],$ylineW1[1],$ylineW1[2]);
         $ylineK1 = $this->sets['color']['ylineK'];
         $ylineK = imagecolorallocate($this->im, $ylineK1[0],$ylineK1[1],$ylineK1[2]);
         $x = $this->sets['position']['x'];
         $x1 = $this->sets['position']['x']-$this->sets['words']['left'];
         $y = $this->sets['size']['height']-$this->sets['position']['y'];
      for ($i=0;$i <= $this->sets['avr']['y'];$i++) {
         $num =$i*$kedu;    
         imagestring($this->im,2,$x1,$y-$num,$kedu1*$i,$ylineW);     //数值
         imageline($this->im,$x+10,$y-$num,$x,$y-$num,$ylineK);  //画标号       
      }
   }
 
   private function drawX(){  //循环画x轴刻度 
         $kedu = (int)($this->sets['lengths']['x']/$this->sets['avr']['x']);
      $kedu1 = (int)($this->sets['max']['x']/$this->sets['avr']['x']);
      $xlineW1 = $this->sets['color']['xlineW'];
         $xlineW = imagecolorallocate($this->im,$xlineW1[0],$xlineW1[1],$xlineW1[2]); 
         $xlineK1 = $this->sets['color']['xlineK'];
         $xlineK = imagecolorallocate($this->im, $xlineK1[0],$xlineK1[1],$xlineK1[2]);
         $x = $this->sets['position']['x'];
         $y = $this->sets['size']['height']- $this->sets['position']['y'];
         $y1 = $y + $this->sets['words']['down'];
         
      for ($i=1;$i <= $this->sets['avr']['x'];$i++) {
         $num =$i*$kedu;    
         imagestringup($this->im,2,$num+$x,$y1,$kedu1*$i,$xlineW);  //数值
         imageline($this->im,$x+$num,$y-10,$x+$num,$y,$xlineK);  //画标号          
      }
   } 
 }
?>

