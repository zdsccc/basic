<?php
/**
 * Created by PhpStorm.
 * User: yesman
 * Date: 2018/5/18
 * Time: 13:49
 */
/**
 * @name    PHP反射API--利用反射技术实现的插件系统架构
 * @author :PHPCQ.COM
 */
interface Iplugin{
    public static function getName();
}
function findPlugins(){
    $plugins = array();
    foreach (get_declared_classes() as $class){
        $reflectionClass = new ReflectionClass($class);
        if ($reflectionClass->implementsInterface('Iplugin')) {
            $plugins[] = $reflectionClass;
        }
    }
    return $plugins;
}
function computeMenu(){
    $menu = array();
    foreach (findPlugins() as $plugin){
        if ($plugin->hasMethod('getMenuItems')) {
            $reflectionMethod = $plugin->getMethod('getMenuItems');
            if ($reflectionMethod->isStatic()) {
                $items = $reflectionMethod->invoke(null);
            } else {
                $pluginInstance = $plugin->newInstance();
                $items = $reflectionMethod->invoke($pluginInstance);
            }
            $menu = array_merge($menu,$items);
        }
    }
    return $menu;
}
function computeArticles(){
    $articles = array();
    foreach (findPlugins() as $plugin){
        if ($plugin->hasMethod('getArticles')) {
            $reflectionMethod = $plugin->getMethod('getArticles');
            if ($reflectionMethod->isStatic()) {
                $items = $reflectionMethod->invoke(null);
            } else {
                $pluginInstance = $plugin->newInstance();
                $items = $reflectionMethod->invoke($pluginInstance);
            }
            $articles = array_merge($articles,$items);
        }
    }
    return $articles;
}

class MycoolPugin implements Iplugin {
    public static function getName(){
        return 'MycoolPlugin';
    }
    public static function getMenuItems(){
        return array(array('description'=>'MycoolPlugin','link'=>'/MyCoolPlugin'));
    }
    public static function getArticles(){
        return array(array('path'=>'/MycoolPlugin','title'=>'This is a really cool article','text'=> 'xxxxxxxxx' ));
    }
}

$menu = computeMenu();
$articles    = computeArticles();
print_r($menu);
print_r($articles);
