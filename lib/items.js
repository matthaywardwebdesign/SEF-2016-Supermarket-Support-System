var db = require("./db.js");
var r = db.getLibrary();
var error = require("./error.js");
var Item = require("./item.js");

module.exports.getItemByName = function(name, callback){
   //Get the database connection
   var conn = db.getConnection();
   //Query for an item matching the provided name
   r.table("items").filter({"name": name}).limit(1).run(conn, function (err, cursor){
      if (err){
         //Return an error
         callback(error.ERROR_DATABASE_ERROR, null);
      } else {
         //We got a result, let's get an array of items
         cursor.toArray(function (err, items){
            if (err){
               //Return an error
               callback(error.ERROR_DATABASE_ERROR, null);
            } else {
               //No items were returned
               if (items[0] == null){
                  //Return an error
                  callback(error.ERROR_ITEM_NO_EXIST, null);
               } else {
                  //Return the item
                  callback(null, new Item(items[0].id));
               }
            }
         });
      }
   });
}
