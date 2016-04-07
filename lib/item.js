var db = require("./db.js");
var r = db.getLibrary();
var error = require("./error.js");

var Item = function(id){
   this.id = id;
};

Item.prototype.getID = function(){
   return this.id;
}

Item.prototype.getDetails = function(callback){
   //Get the database connection
   var conn = db.getConnection();
   //Query the data
   r.table("items").filter({"id": this.id}).limit(1).run(conn, function (err, cursor){
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
                  callback(null, items[0]);
               }
            }
         });
      }
   });
}

module.exports = Item;
