<?php
/**
 * Created by PhpStorm.
 * User: yesman
 * Date: 2018/5/16
 * Time: 11:43
 */

/**
 * Finds all of the keywords (words that appear most) on param $str
 * and return them in order of most occurrences to less occurrences.
 * @param string $str The string to search for the keywords.
 * @param int $minWordLen[optional] The minimun length (number of chars) of a word to be considered a keyword.
 * @param int $minWordOccurrences[optional] The minimun number of times a word has to appear
 * on param $str to be considered a keyword.
 * @param boolean $asArray[optional] Specifies if the function returns a string with the
 * keywords separated by a comma ($asArray = false) or a keywords array ($asArray = true).
 * @return mixed A string with keywords separated with commas if param $asArray is true,
 * an array with the keywords otherwise.
 */
function extract_keywords($str, $minWordLen = 3, $minWordOccurrences = 2, $asArray = false)
{
    function keyword_count_sort($first, $sec)
    {
        return $sec[1] - $first[1];
    }
    $str = preg_replace('/[^\\w0-9 ]/', ' ', $str);
    $str = trim(preg_replace('/\s+/', ' ', $str));

    $words = explode(' ', $str);
    $keywords = array();
    while(($c_word = array_shift($words)) !== null)
    {
        if(strlen($c_word) <= $minWordLen) continue;

        $c_word = strtolower($c_word);
        if(array_key_exists($c_word, $keywords)) $keywords[$c_word][1]++;
        else $keywords[$c_word] = array($c_word, 1);
    }
    usort($keywords, 'keyword_count_sort');

    $final_keywords = array();
    foreach($keywords as $keyword_det)
    {
        if($keyword_det[1] < $minWordOccurrences) break;
        array_push($final_keywords, $keyword_det[0]);
    }
    return $asArray ? $final_keywords : implode(', ', $final_keywords);
}

//How to use

//Basic lorem ipsum text to extract the keywords
$text = "
Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Curabitur eget ipsum ut lorem laoreet porta a non libero.
Vivamus in tortor metus. Suspendisse potenti. Curabitur
metus nisi, adipiscing eget placerat suscipit, suscipit
vitae felis. Integer eu odio enim, sed dignissim lorem.
In fringilla molestie justo, vitae varius risus lacinia ac.
Nulla porttitor justo a lectus iaculis ut vestibulum magna
egestas. Ut sed purus et nibh cursus fringilla at id purus.
";
//Echoes: lorem, suscipit, metus, fringilla, purus, justo, eget, vitae, ipsum, curabitur, adipiscing
echo extract_keywords($text);


//该代码片段来自于: http://www.sharejs.com/codes/php/99
