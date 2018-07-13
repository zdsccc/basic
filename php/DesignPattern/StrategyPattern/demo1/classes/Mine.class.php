<?php
class Mine
{
    private $_strategy;
    private $_isChange;
    // DI:constructor injection
    public function __construct(Travel $travel)
    {
        $this->_strategy=$travel;
    }
    // DI:setter injection
    public function change(Travel $travel)
    {
        $this->_strategy=$travel;
        $this->_isChange=true;
    }
    public function goTravel()
    {
        if($this->_isChange){
            echo "现在改变主意。";
            $this->_strategy->go();
        }else{
            $this->_strategy->go();
        }
    }
}
