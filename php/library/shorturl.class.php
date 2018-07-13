<?php
class ShortUrl
{
    public $dictionary = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    public $db;
    function __construct()
    {
        $this->dictionary = str_split($this->dictionary);
        $this->db	= new oracle_db();
        $this->db->connect();
    }
    private function trans($i)
    {
        $query = "select id,longurl from tshorturl where seq='".$i."'";
        $row = $this->db->execute_fetch($query, OCI_ASSOC);
        $k = $row[ID];
        while ($k > 0)
        {
            $result[] = $this->dictionary[($k % 62)];
            $k = floor($k / 62);
        }
        $result = join("", array_reverse($result));
        $result = str_pad($result, 6 , "0",STR_PAD_LEFT);
        ShortcurLink( $row[ID], $result, $row[LONGURL] );
        $sql = "update tshorturl set shorturl='".$result."' where id='".$row[ID]."'";
        $this->db->execute($sql);
        return $result;
    }
    private function getSn($oriurl)
    {
        $seq = substr(md5(date('YmdHis').rand(1000,9999)),8,16);
        $sql = "insert into tshorturl (id,longurl,seq,create_ts) values (seq_tshorturl.nextval,'".$oriurl."','".$seq."',sysdate)";
        $this->db->execute($sql);
        return $seq;
    }
    function setShortLink($oriurl)
    {
        $cnt   = $this->getSn($oriurl);
        $url   = "http://c.linktech.cn/".$this->trans($cnt);
        if($url){
            return $url;
        }else{
            return false;
        }
    }
    function getLongLink($shortCode)
    {
        $i = 0;
        $input = str_split($shortCode);
        foreach($input as $char)
        {
            $pos = array_search($char, $this->dictionary);

            $i = $i * 62 + $pos;
        }
        $sql = "select longurl from shorturl where id='".$i."'";
        $row = $this->db->execute_fetch($sql, OCI_ASSOC);
        return $row[0];
    }
}