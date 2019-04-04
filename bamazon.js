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
        connection.query("SELECT * FROM products", function(err, res) {
          if (err) throw err;
        for (var i=0; i<res.length; i++) {
            console.log("\n---------------------")
            console.log(`Product ID: ${res[i].item_id}`);
            console.log(`Product Name: ${res[i].product_name}`)
            console.log(`Department Name: ${res[i].department_name}`)
        }
    
 inquirer
        .prompt([
          {
            name: "productId",
            type: "input",
            message: "What is the product id would you like to purchase?",
            validate: function(value) {
              if (isNaN(value) === false) {
                return true;
              }
              console.log("Please enter whole number");
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
                console.log("Please enter whole number");
                return false;
              }
          }
        ]) 
  
    .then(function(answer) {
        console.log("hi");
        // console.log(res);
        // get the information of the chosen item
        var chosenProduct = res[0];
        for (var i = 0; i < res.length; i++) {
          if (res[i].item_id === answer.productId) {
              console.log("Hi ");
            //   chosenProduct = res[i];
        //   var chosenProduct = res[i].item_id;
            console.log(chosenProduct);
          }
        }

        // determine if bid was high enough
    
        if (chosenProduct.stock_quantity > parseInt(answer.units)) {
          
          connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              {
                stock_quantity: chosenProduct.stock_quantity - answer.units
              },
              {
                item_id: chosenProduct.item_id
              }
            ],
            function(error) {
                var totalCost = answer.units * chosenProduct.price;
              if (error) throw err;
              console.log(`Your purchase went through, total cost: $${totalCost}`);
              start();
            }

          );
        }else {
            console.log("Insufficient quantity! Would you like to pick another item");
            start();
        }
   
    })
 
      });
  
}




