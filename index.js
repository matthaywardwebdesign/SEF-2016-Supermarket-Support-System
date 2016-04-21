var db = require("./lib/db.js");
var items = require("./lib/items.js");
var Item = require("./lib/item.js");
var r = db.getLibrary();
var error = require("./lib/error.js");
var transactions = require("./lib/transactions.js");
var Transaction = require("./lib/transaction.js");

//Connect to the database
//note - RMIT blocks the port used by RethinkDB, run this code on the server
//or on a non RMIT network

//To run unit tests make sure you have nodeunit installed and run
//
// nodeunit
//

db.connect(function(err){
   if (!err){
      var item = new Item({
         "ean": 4011 ,
         "id": 133211 ,
         "isWeighted": true ,
         "name":  "Banana Cavendish" ,
         "price": 2.7 ,
         "soh": 0
      });

      items.saveItem(item, function (err){
         var t = new Transaction({
            "transactionNo":40,
            "customerNo":55,
            "date": new Date().toString(),
         });
         t.addItem(item);
         transactions.saveTransaction(t, function (err){
            console.log("Transaction saved");
         });
      })
   }
});
