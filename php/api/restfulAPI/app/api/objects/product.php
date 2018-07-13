<?php
class Product
{
	// database connection and table name
	private $conn;
	private $table_name = "products";

	// object properties
	public $id;
	public $name;
	public $description;
	public $price;
	public $category_id;
	public $category_name;
	public $created;

	// constructor with $db as database connection
	public function __construct($db)
	{
		$this->conn = $db;
	}

	// read products
	public function read()
	{
		// select all query
		$query = "
			select
				c.name as category_name,
				p.id,
				p.name,
				p.description,
				p.price,
				p.category_id,
				p.created
			from
				" . $this->table_name . " p
			left join
				categories c
			on
				p.category_id = c.id
			order by
				p.created desc
		";

		// prepare query statement
		$stmt = $this->conn->prepare($query);

		// execute query
		$stmt->execute();

		return $stmt;
	}

	// create product
	public function create()
	{
		// query to insert record
		$query = "
			insert into
				" . $this->table_name . "
			set
				name=:name,price=:price,description=:description,category_id=:category_id,created=:created
		";

		// prepare query
		$stmt = $this->conn->prepare($query);

		// sanitize
		$this->name = htmlspecialchars(strip_tags($this->name));
		$this->price = htmlspecialchars(strip_tags($this->price));
		$this->description = htmlspecialchars(strip_tags($this->description));
		$this->category_id = htmlspecialchars(strip_tags($this->category_id));
		$this->created = htmlspecialchars(strip_tags($this->created));

		// bind values
		$stmt->db2_bind_param(":name",$this->name);
		$stmt->db2_bind_param(":price",$this->price);
		$stmt->db2_bind_param(":description",$this->description);
		$stmt->db2_bind_param(":category_id",$this->category_id);
		$stmt->db2_bind_param(":created",$this->created);

		// execute query
		if($stmt->execute()){
			return true;
		}

		return false;
	}

	// used when filling up the update product form
	public function readOne()
	{
		// query to read single record
		$query = "
			select
				c.name as category_name,
				p.id,
				p.name,
				p.description,
				p.price,
				p.category_id,
				p.created
			from
				" . $this->table_name . " p
			left join
				categories c
			on
				p.category_id = c.id
			where
				p.id = ?
			limit
			 	0,1
		";

		// prepare query statement
		$stmt = $this->conn->prepare($query);

		// bind id of product to be updated
		$stmt->bindParam(1,$this->id);

		// execute query
		$stmt->execute();

		// get retrieved row
		$row = $stmt->fetch(PDO::FETCH_ASSOC);

		// set values to object properties
		$this->name = $row['name'];
		$this->price = $row['price'];
		$this->description = $row['description'];
		$this->category_id = $row['category_id'];
		$this->category_name = $row['category_name'];
	}

	// update the product
	public function update()
	{
		// update query
		$sql = "
			update " . $this->table_name . "
			set
				name = :name,
				price = :price,
				description = :description,
				category_id = :category_id
			where
				id = :id
		";

		// prepare query statement
		$stmt = $this->conn->prepare($query);

		// sanitize
		$this->name = htmlspecialchars(strip_tags($this->name));
		$this->price = htmlspecialchars(strip_tags($this->price));
		$this->description = htmlspecialchars(strip_tags($this->description));
		$this->category_id = htmlspecialchars(strip_tags($this->category_id));
		$this->id = htmlspecialchars(strip_tags($this->id));

		// bind new values
		$stmt->bindParam(":name",$this->name);
		$stmt->bindParam(":price",$this->price);
		$stmt->bindParam(":description",$this->description);
		$stmt->bindParam(":category_id",$this->category_id);
		$stmt->bindParam(":id",$this->id);

		// execute the query
		if($stmt->execute())
		{
			return true;
		}

		return false;
	}

	// delete the product
	public function delete()
	{
		// delete query
		$query = "delete from " . $this->table_name . " where id = ?";

		// prepare query
		$stmt = $this->conn->prepare($query);

		// sanitize
		$this->id = htmlspecialchars(strip_tags($this->id));

		// bind id of record to delete
		$stmt->bindParam(1,$this->id);

		// execute query
		if($stmt->execute())
		{
			return true;
		}

		return false;
	}

	// search products
    public function search($keywords)
    {
        // select all query
        $query = "
            select
                c.name as category_name,
                p.id,
                p.name,
                p.description,
                p.price,
                p.category_id,
                p.created
            from
                " . $this->table_name . " p 
            left join
                categories c
            on p.category_id = c.id
            where
                p.name like ?
                or
                p.description like ?
                or
                c.name like ?
            order by
                p.created desc
        ";

        // prepare query statement
        $stmt = $this->conn->prepare($query);

        // sanitize
        $keywords = htmlspecialchars(strip_tags($keywords));
        $keywords = "%{$keywords}%";

        // bind
        $stmt->bindParam(1,$keywords);
        $stmt->bindParam(2,$keywords);
        $stmt->bindParam(3,$keywords);

        //execute query
        $stmt->execute();

        return $stmt;
    }

    // read products with pagination
    public function readPaging($from_record_num,$records_per_page)
    {
        // select query
        $query = "
            select 
                c.name as category_name,
                p.id,
                p.name,
                p.description,
                p.price,
                p.category_id,
                p.created
            FROM
                " . $this->table_name . " p
            left join
                categories c
            on
                p.category_id = c.id
            order by
                p.created desc
            limit ?,?
        ";

        // prepare query statement
        $stmt = $this->conn->prepare($query);

        // bind variable values
        $stmt->bindParam(1,$from_record_num,PDO::PARAM_INT);
        $stmt->bindParam(2,$records_per_page,PDO::PARAM_INT);

        // execute query
        $stmt->execute();

        // return values from databse
        return $stmt;
    }

    // used for paging products
    public function count()
    {
        $query = "select count(*) as total_rows from " . $this->table_name . "";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        return $row['total_rows'];
    }
}
?>