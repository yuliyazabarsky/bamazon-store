# bamazon-store

******* Challenge #1: Bamazon Customer *******


Create a MySQL Database called bamazon.
Then create a Table inside of that database called products.
The products table should have each of the following columns:

* item_id (unique id for each product)
* product_name (Name of product)
* department_name
* price (cost to customer)
* stock_quantity (how much of the product is available in stores)

Populate this database with around 10 different products. 
Running BamazinSuctomer app will:

<img width="573" alt="bamazon-Customers" src="https://user-images.githubusercontent.com/44987476/55530464-7d924600-5663-11e9-9f28-c8447ace79c7.png">

* First display all of the items available for sale. Include the ids, names, and prices of products for sale.


* App prompts users with two messages: 
The first should ask them the ID of the product they would like to buy.
The second message should ask how many units of the product they would like to buy.

* Once the customer has placed the order, the app checks if your store has enough of the product to meet the customer's request.


* If not, the app logs a phrase like Insufficient quantity!, and then prevent the order from going through.


* However, if your store does have enough of the product, you should fulfill the customer's order.
This means updating the SQL database to reflect the remaining quantity.
Once the update goes through, show the customer the total cost of their purchase.



****** Challenge #2: Bamazon Manager *******

Running this application will:

* List a set of menu options:

* View Products for Sale - the app should list every available item: the item IDs, names, prices, and quantities.

* View Low Inventory - list all items with an inventory count lower than 5.

* Add to Inventory - app should display a prompt that will let the manager "add more" of any item currently in the store.

* Add New Product - the app will allow the manager to add a completely new product to the store.








