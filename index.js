var db = require("./lib/db.js");
var items = require("./lib/items.js");
var Item = require("./lib/item.js");
var r = db.getLibrary();
var error = require("./lib/error.js");

//Connect to the database
//note - RMIT blocks the port used by RethinkDB, run this code on the server
//or on a non RMIT network

//To run unit tests make sure you have nodeunit installed and run
//
// nodeunit
//

db.connect(function(err){
   if (!err){
      // var item = new Item({
      //    "id": 133211,
      //    "name": "Banana Cavendish",
      //    "ean":4011,
      //    "price":2.70,
      //    "isWeighted": true
      // });
      // items.saveItem(item, function (err){
      //    console.log("Item Added");
      // });
      items.getItemByEAN(4011, function (err, item){
         var result = item.removeStock(400);
         if (result != null){
            console.log(result);
         }
         items.saveItem(item, function(){});
      });
   }
});