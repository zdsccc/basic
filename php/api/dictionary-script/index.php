<html>
    <head>
        <title>PHP Dictionary Script</title>
        <link rel="stylesheet" type="text/css" href="style.css">
        <script>
            function toSubmit(){	
                var wrd = document.getElementById('wd').value;
                if (wrd=='') {
                    document.getElementById("op").innerHTML="Enter Word!!";
                    document.getElementById('txtop').value='';
                    return false;
                }
                else{
                    return true;
                }
                //return false;
            }
            function checnum(as)
            {
                var a = as.value;
                as.value = a.replace(/[^a-z]/g,'');
            }
        </script>
    </head>
    <body>
        <div class='resp_code'>
            <div align='center'><b>PHP Dictionary Script</b></div>
            <form name='test' method='post' action='' onsubmit="return toSubmit();">
            <div class='frms noborders' align='left'>
                <b>Enter a word to get meaning : </b><br>
                <input type='text' name='word' maxlength=30 onkeyup='checnum(this)' style='width:80%;' id='wd'>
                <input type='submit' value='Synonym' name='submit'>   
            </div>
            <div id='op' style='color:red;' align='center'></div>
            </form>
            
                <?php
                    error_reporting(0);
                    if(isset($_POST['submit']))
                    {
                        $word = $_POST['word'];
                        $test = @json_decode(file_get_contents("http://words.bighugelabs.com/api/2/6da75d0502532591ee0cd65481473752/$word/json"), true);
                        if($test=='')
                        {
                            echo "<div align='center' style='color:red;'>No synonyms found</font>";
                        }
                        else{
                            echo "<textarea id='txtop'>";
                            foreach ($test["noun"]["syn"] as $key){                              
                                    echo $key.", ";                             
                            }
                            echo "</textarea>";
                        }   
                    }
                ?>
        <div  align='center' style="font-size: 10px;color: #dadada;" id="dumdiv">
            <a href="https://www.hscripts.com" id="dum" style="font-size: 10px;color: #dadada;text-decoration:none;color: #dadada;">&copy;h</a>
        </div>
        </div>
        
    </body>
</html>