<?php
/**
 * Created by PhpStorm.
 * User: yesman
 * Date: 2018/2/27
 * Time: 16:30
 */
class category
{
    // database connection and table name
    private $conn;
    private $table_name = "categories";

    // object properities
    public $id;
    public $name;
    public $description;
    public $created;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    // used by select drop-down list
    public function readAll()
    {
        // select all data
        $query = "
            select
                id,name,description,created
            from 
                " . $this->table_name . "
            order by
                name
        ";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return $stmt;
    }

    // used by select drop-down list
    public function read()
    {
        // select all data
        $query = "
            select
                id,name,description
            from
                " . $this->table_name . "
            order by
                name
        ";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return $stmt;
    }
}
?>