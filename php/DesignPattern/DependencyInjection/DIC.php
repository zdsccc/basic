<?php
class Container
{
    public $instances = [];

    function set($name, Closure $closure)
    {
        $this->instances[$name] = $closure;
    }
    function get($name)
    {
        return $this->instances[$name]($this);
    }
    function singleton($name, Closure $closure)
    {
        $this->instances[$name] = function() use($closure)
        {
            static $declared;

            if (is_null($declared)) {
                $declared = $closure($this);
            }
            return $declared;
        };
    }
}



