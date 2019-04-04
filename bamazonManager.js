var mysql = require("mysql");
var inquire = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon_DB"
});

connection.connect(function (err){
    // console.log("Your connection: " + connection.threadId);
    if (err) throw err;
    start();

})
function start(){
    console.log (`\n *** Bamazon Manager *** \n`);
    inquire. prompt({
        name: "action",
        type: "rawlist",
        message: "Please select from the following menu options:",
        choices: ["View Products for Sale",
            "View Low Inventory",
            "Add to Inventory",
            "Add New Product",
            "Exit"
    ],
        validate: function(value) {
            if (isNaN(value) === false) {
              return true;
            }
            console.log("Please enter Product ID number.");
            return false;
          }
    }).then (function (answer){
        switch(answer.action){

            case "View Products for Sale":
            viewProducts();
            break;

            case "View Low Inventory":
            viewLowInventory();
            break;

            case "Add to Inventory": 
            addInventory();
            break;

            case "Add New Product":
            addNewProduct();
            break;

            case "Exit":
            connection.end();
            break;
        }
    })
}

function viewProducts(){
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        for (var i=0; i<res.length; i++) {
            console.log("\n---------------------")
            console.log(`Product ID: ${res[i].item_id}`);
            console.log(`Product Name: ${res[i].product_name}`);
            console.log(`Department Name: ${res[i].department_name}`);
            console.log(`Stock quantity: ${res[i].stock_quantity}`);
        }
        start();
    })   
}

function viewLowInventory(){
    connection.query("SELECT * FROM products", function (err, res){
        if (err) throw err; 
        var fullyStocked = true;
        for (var i = 0; i < res.length; i++){
            if (parseInt(res[i].stock_quantity) < 5){
                fullyStocked = false;
                console.log("\n The stock quantity for below item(s) is below 5");
                console.log("\n---------------------");
                // console.log(res);
                console.log(`Product ID: ${res[i].item_id}`);
                console.log(`Product Name: ${res[i].product_name}`);
                console.log(`Department Name: ${res[i].department_name}`);
                console.log(`Current stock quantity: ${res[i].stock_quantity}`);
            }         
        } 
        if (fullyStocked){
        console.log("\n---------------------")
        console.log(" Stock quantity for all items is above 5");
        console.log("\n---------------------")
        }
        start();
    })
}

// If a manager selects Add to Inventory, your app should display a prompt that will let the manager "add more" of any item currently in the store.

function addInventory(){
    connection.query("SELECT * FROM products", function (err, res){
    inquire.prompt([
        {
        name: "itemId",
        type: "input",
        message: "Please entrer Item Id you want to add inventory",
        validate: function(value) {
            if (isNaN(value) === false) {
              return true;
            }
            console.log("Please enter Product ID number to add inventory.");
            return false;}
        },
        {
            name: "units",
            type: "input",
            message: "How many units of the product should be added?",
            validate: function(value) {
                if (isNaN(value) === false) {
                  return true;
                }
                console.log("Please enter number of units.");
                return false;
              }
          }
    ]).then (function (answer){
        var chosenId;
        for (var i = 0; i < res.length; i++) {
          if (res[i].item_id === parseInt(answer.itemId)){
              chosenId = res[i];
              console.log("\nProduct Name: " + res[i].product_name +".");
              console.log("Stock quantity: " + res[i].stock_quantity + " units.");
                connection.query(
                  "UPDATE products SET ? WHERE ?",
                  [
                    {
                      stock_quantity: chosenId.stock_quantity + parseInt(answer.units)
                    },
                    {
                      item_id: chosenId.item_id
                    }
                  ],
                  function(err) {
                      if (err) throw err;
                      var newQuantity = chosenId.stock_quantity + parseInt(answer.units);  
                      console.log(`\nUpdated stock quantity: ${newQuantity} units.`);

                      start();
                  });
              }
            }
        })
    })
}

// If a manager selects Add New Product, it should allow the manager to add a completely new product to the store.        
       
function addNewProduct(){
    console.log(`Please enter the following information about new product: `);
    inquire.prompt([
        {
            name: "productName",
            type: "input",
            message: "Enter new product name "
        },
        {
            name: "department",
            type: "input",
            message: "Entry department name for the new product"
        },
        {
            name: "price",
            type: "input",
            message: "Enter new product's unit price"
        },
        {
            name: "stockQuantity",
            type: "input",
            message: "Enter quantity of units",
            validate: function(value) {
                if (isNaN(value) === false){
                  return true;
                }
                console.log("Please enter number of units.");
                return false;
              }
        }
    ]).then (function(answer){
    console.log("Inserting a new product...\n");
    connection.query("INSERT INTO products SET?",
    {
        product_name: answer.productName,
        department_name: answer.department,
        price: answer.price,
        stock_quantity: answer.stockQuantity
    },
    function(err, res) {
        if(err) throw err;
        console.log("New product added!");

    //   console.log(res.affectedRows + " product inserted!\n");
      // Call updateProduct AFTER the INSERT completes
      start();
    }
  );
        

    })
}
