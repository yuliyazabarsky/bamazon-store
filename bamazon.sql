DROP DATABASE IF EXISTS bamazon_DB;

CREATE database bamazon_DB;

USE bamazon_DB;


CREATE TABLE products (
  item_id INT AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price INT NOT NULL,
  stock_quantity INT NOT NULL,
  PRIMARY KEY (item_id)
);
ALTER TABLE products
MODIFY COLUMN price DECIMAL(10, 2) NOT NULL;
 
DELETE FROM products WHERE item_id=11;

SELECT * FROM products;

1	tent	camping	200.00	8
2	water bottle	sports	10.00	51
3	chair	furniture	20.00	41
4	tea kettle	kitchen	15.00	30
5	soap	bath	2.00	30
6	suitecase	luggage	17.00	12
7	cake pop mold	baking	2.00	55
8	fish food	animals	10.00	20
9	hair spary	beauty	4.00	20
10	giant panda toy	toys	25.00	10
12	unicorn	toys	5.00	9
13	post cards	misc	1.00	50
14	plate	kitchen	1.00	10
15	laptop	electronics	400.50	3
16	cup	kitchen	2.50	51
17	shower gel	bath	3.75	20