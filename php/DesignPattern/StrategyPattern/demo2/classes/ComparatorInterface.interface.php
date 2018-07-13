<?php
/**
 * Created by PhpStorm.
 * User: hiyesman
 * Date: 2018/2/4
 * Time: 21:42
 */

namespace DesignPatterns\Behavioral\Strategy;

/**
 * ComparatorInterface类
 */
interface ComparatorInterface
{
    /**
     * @param mixed $a
     * @param mixed $b
     *
     * return bool
     */
    public function compare($a,$b);
}