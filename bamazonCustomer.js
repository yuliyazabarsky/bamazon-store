var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon_DB"
  });

connection.connect(function(err) {
    if (err) throw err;
    start();
  });

function start() {
    console.log("\nBamazon Products for Sale:\n");
    inquirer.prompt({
        name: "purchaseOrNot",
        type: "rawlist",
        message: "Would you like to purchase something?",
        choices: ["Yes", "No/Exit"]}). then (function (answer){
            if (answer.purchaseOrNot === "Yes"){
                makePurchase();
            } else{
                console.log("\nSee you next time.\n");
                connection.end();
            }
        })
}

function makePurchase(){
        connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        for (var i=0; i<res.length; i++) {
            console.log("\n---------------------")
            console.log(`Product ID: ${res[i].item_id}`);
            console.log(`Product Name: ${res[i].product_name}`);
            console.log(`Department Name: ${res[i].department_name}`);
        }
    
 inquirer.prompt([
          {
            name: "productId",
            type: "input",
            message: "What is the Product ID would you like to buy?",
            validate: function(value) {
              if (isNaN(value) === false) {
                return true;
              }
              console.log("Please enter Product ID number.");
              return false;
            }
          },
          {
            name: "units",
            type: "input",
            message: "How many units of the product would you like to buy?",
            validate: function(value) {
                if (isNaN(value) === false) {
                  return true;
                }
                console.log("Please enter number of units.");
                return false;
              }
          }
        ]) 
  
    .then(function(answer) {

        // get the information of the chosen item
        var chosenProduct;
        for (var i = 0; i < res.length; i++) {
          if (res[i].item_id === parseInt(answer.productId)){
              chosenProduct = res[i];
        //   var chosenProduct = res[i].item_id;
            // console.log(chosenProduct);
          }
        }

        // compaire stock_quantity to units requested 
    
        if (chosenProduct.stock_quantity > parseInt(answer.units)) {
          
          connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              {
                stock_quantity: chosenProduct.stock_quantity - parseInt(answer.units)
              },
              {
                item_id: chosenProduct.item_id
              }
            ],
            function(err) {
                if (err) throw err;
                var totalCost = parseInt(answer.units) * chosenProduct.price;
                console.log(`\nYour purchase went through, total cost: $${totalCost}.`);
                start();
            }
          );
        }else {
            console.log("\nSorry, insufficient quantity! Check out other items available.");
            start();
        }
        })
    });
}





