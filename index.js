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
      //Search by name
      items.getItemByName("Bananasfs", function (err, item){
         if (err){
            console.log(err);
         } else {
            item.getDetails(function(err, details){
               console.log(details);
            });
         }
      });
      //Get by id
      var item = new Item(311211);
      item.getDetails(function(err, details){
         console.log(details);
      });
   }
});
