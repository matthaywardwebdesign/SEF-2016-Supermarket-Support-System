var db = require("./lib/db.js");
var items = require("./lib/items.js");
var Item = require("./lib/item.js");
var r = db.getLibrary();
var error = require("./lib/error.js");
var transactions = require("./lib/transactions.js");
var Transaction = require("./lib/transaction.js");
var api = require("./lib/api.js");

//Connect to the database
//note - RMIT blocks the port used by RethinkDB, run this code on the server
//or on a non RMIT network

//To run unit tests make sure you have nodeunit installed and run
//
// nodeunit
//

db.connect(function(err){
   if (!err){
      var t = new Transaction({"id":1, "customerNo": 1, "date": new Date()});
      t.addItemByID(133211, 2.5);
      t.addItemByID(12345, 2);
      t.getItems(function(result){
         var total = 0.0;
         result.forEach(function(data){
            total+= (data.item.price * data.qty);
         });
         console.log("Total price for this transaction: " + total);
      })
   } else {
      console.log(err);
   }
});
