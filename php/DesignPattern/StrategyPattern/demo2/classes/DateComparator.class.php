<?php
namespace DesignPatterns\Behavioral\Strategy;

/**
 * DateComparator类
 */
class DateComparator implements ComparatorInterface
{
    /**
     * @param mixed $a
     * @param mixed $b
     *
     * @return bool
     */
    public function compare($a, $b)
    {
        $aDate = new \DateTime($a['date']);
        $bDate = new \DateTime($b['date']);
        if($aDate == $bDate){
            return 0;
        }else{
            return $aDate < $bDate ? -1 : 1;
        }
    }
}
