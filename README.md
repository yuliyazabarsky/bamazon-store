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
<img width="589" alt="Producs-Table" src="https://user-images.githubusercontent.com/44987476/55530746-9818ef00-5664-11e9-8877-faa5f915ee6c.png">

Populate this database with around 10 different products. 

Running BamazonCustomer app will:

<img width="573" alt="bamazon-Customers" src="https://user-images.githubusercontent.com/44987476/55530464-7d924600-5663-11e9-9f28-c8447ace79c7.png">

* First display all of the items available for sale. Include the ids, names, and prices of products for sale.

* App prompts users with two messages: 

The first should ask them the ID of the product they would like to buy.
The second message should ask how many units of the product they would like to buy.

* Once the customer has placed the order, the app checks if your store has enough of the product to meet the customer's request.
* If not, the app logs a phrase like Insufficient quantity!, and then prevent the order from going through.

<img width="666" alt="Insufficient-qty" src="https://user-images.githubusercontent.com/44987476/55530512-ae727b00-5663-11e9-846d-424183f57f83.png">

* However, if your store does have enough of the product, you should fulfill the customer's order.
This means updating the SQL database to reflect the remaining quantity.
Once the update goes through, show the customer the total cost of their purchase.

<img width="676" alt="Purchase" src="https://user-images.githubusercontent.com/44987476/55530506-ac102100-5663-11e9-84bf-4f444e117511.png">


****** Challenge #2: Bamazon Manager *******

Running this application will:

* List a set of menu options:
<img width="672" alt="bamazon-Managers" src="https://user-images.githubusercontent.com/44987476/55530518-b5998900-5663-11e9-8df2-dce1ff89b6e5.png">

* View Products for Sale - the app should list every available item: the item IDs, names, prices, and quantities.

* View Low Inventory - list all items with an inventory count lower than 5.

<img width="569" alt="Low_inventory" src="https://user-images.githubusercontent.com/44987476/55530526-bdf1c400-5663-11e9-98fd-731950329653.png">

* Add to Inventory - app should display a prompt that will let the manager "add more" of any item currently in the store.
<img width="649" alt="Add-inventory " src="https://user-images.githubusercontent.com/44987476/55530521-b92d1000-5663-11e9-8960-544066575a13.png">

* Add New Product - the app will allow the manager to add a completely new product to the store.

<img width="630" alt="Add-new-product" src="https://user-images.githubusercontent.com/44987476/55530522-baf6d380-5663-11e9-9e19-b9c7fb0a03e8.png">







