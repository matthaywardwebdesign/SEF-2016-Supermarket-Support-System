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
      items.deleteItemByID(311211, function (err){
         console.log(err);
         items.getAllItems(function (err, result){
            console.log(result);
         });
      });
   }
});
