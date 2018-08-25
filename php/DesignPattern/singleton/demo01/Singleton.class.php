<?php
// 三私一公
class Singleton {
    // 私有化静态属性
    private static $obj;
    // 私有化构造方法
    private function __construct(){}
    // 私有化克隆方法
    private function __clone(){}
    // 静态方法产生对象
    static public function getInstance()
    {
        // 判断对象是否存在，不存在则new一个对象
        if (!is_object(self::$obj)) {
            self::$obj = new Singleton();
        }
        return self::$obj;
    }
}

