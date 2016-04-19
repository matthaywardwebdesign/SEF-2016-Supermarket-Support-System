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
                  callback(null, new Item(items[0]));
               }
            }
         });
      }
   });
}

module.exports.getItemByEAN = function(ean, callback){
   //Get the database connection
   var conn = db.getConnection();
   //Query for an item matching the provided name
   r.table("items").filter({"ean": ean}).limit(1).run(conn, function (err, cursor){
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
                  callback(null, new Item(items[0]));
               }
            }
         });
      }
   });
}

module.exports.getItemByID = function(id, callback){
   //Get the database connection
   var conn = db.getConnection();
   r.table("items").get(id).run(conn, function (err, item){
      if (err){
         callback(error.ERROR_DATABASE_ERROR, null);
      } else {
         if (item == null){
            callback(error.ERROR_ITEM_NO_EXIST, null);
         } else {
            callback(null, new Item(item));
         }
      }
   });
}

module.exports.saveItem = function(item, callback){
   //Get the database connection
   var conn = db.getConnection();
   r.table("items").insert(item, {conflict: "update"}).run(conn, function (err){
      if (err){
         console.log(err);
         //Return an error
         callback(error.ERROR_DATABASE_ERROR);
      } else {
         callback(null);
      }
   });
}

module.exports.getAllItems = function(callback){
   var conn = db.getConnection();
   r.table("items").run(conn, function (err, cursor){
      if (err){
         callback(error.ERROR_DATABASE_ERROR, null);
      } else {
         cursor.toArray(function (err, result){
            if (err){
               callback(error.ERROR_DATABASE_ERROR, null);
            } else {
               var items = [];
               for (var i = 0; i < result.length; i++){
                  var item = new Item(result[i]);
                  items.push(item);
               }
               callback(null, items);
            }
         });
      }
   });
}
