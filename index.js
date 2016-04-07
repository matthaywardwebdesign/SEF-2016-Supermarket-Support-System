var db = require("./lib/db.js");
var items = require("./lib/items.js");
var Item = require("./lib/item.js");
var r = db.getLibrary();

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
      items.getItemByName("Banana", function (item){
         item.getDetails(function(details){
            console.log(details);
         });
      });
      //Get by id
      var item = new Item(311211);
      item.getDetails(function(details){
         console.log(details);
      });
   }
});
