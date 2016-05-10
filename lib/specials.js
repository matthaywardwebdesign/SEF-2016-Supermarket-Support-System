var db = require("./db.js");
var r = db.getLibrary();
var error = require("./error.js");
var Special = require("./special.js");

module.exports.setDB = function(database){
   db = database;
}

module.exports.getSpecialByID = function(id, callback){
   var conn = db.getConnection();
   r.table("specials").get(id).run(conn, function (err, special){
      if (err){
         callback(error.ERROR_DATABASE_ERROR, null);
      } else {
         callback(null, new Special(special));
      }
   });
}

module.exports.getSpecialByItemID = function(itemID, callback){
   var conn = db.getConnection();
   r.table("specials").filter({"itemID": itemID}).run(conn, function (err, cursor){
      if (err){
         callback(error.ERROR_DATABASE_ERROR, null);
      } else {
         cursor.toArray(function (err, result){
            if (err){
               callback(error.ERROR_DATABASE_ERROR, null);
            } else {
               var Specials = [];
               for (var i = 0; i < result.length; i++){
                  Specials.push(new Special(result[i]));
               }
               callback(null, Specials);
            }
         });
      }
   });
}


module.exports.getAllSpecials = function(callback){
   var conn = db.getConnection();
   r.table("specials").run(conn, function (err, cursor){
      if (err){
         callback(error.ERROR_DATABASE_ERROR, null);
      } else {
         cursor.toArray(function (err, result){
            if (err){
               callback(error.ERROR_DATABASE_ERROR, null);
            } else {
               var Specials = [];
               for (var i = 0; i < result.length; i++){
                  Specials.push(new Special(result[i]));
               }
               callback(null, Specials);
            }
         });
      }
   });
}

module.exports.saveSpecial = function(Special, callback){
   var conn = db.getConnection();
   r.table("specials").insert(Special, {conflict: "update"}).run(conn, function (err){
      if (err){
         console.log(err);
         callback(error.ERROR_DATABASE_ERROR);
      } else {
         callback(null);
      }
   });
}

module.exports.deleteSpecial = function(Special, callback){
   var conn = db.getConnection();
   r.table("specials").get(Special.getID()).delete().run(conn, function (err){
      if (err){
         callback(error.ERROR_DATABASE_ERROR);
            } else {
         callback(null);
      }
   });
}


module.exports.deleteSpecialByID = function(id, callback){
   var conn = db.getConnection();
   r.table("specials").get(id).delete().run(conn, function (err){
      if (err){
         callback(error.ERROR_DATABASE_ERROR);
      } else {
         callback(null);
      }
   });
}
