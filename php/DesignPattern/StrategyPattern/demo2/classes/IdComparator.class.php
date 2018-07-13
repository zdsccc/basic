<?php
namespace DesignPatterns\Behavioral\Strategy;
/**
 * Class IdComparator
 * @package DesignPatterns\Behavioral\Strategy
 */
class IdComparator implements ComparatorInterface
{
    /**
     * @param mixed $a
     * @param mixed $b
     *
     * return bool
     */
    public function compare($a, $b)
    {
        if($a['id'] == $b['id']){
            return 0;
        }else{
            return $a['id'] < $b['id'] ? -1 :1;
        }
    }
}