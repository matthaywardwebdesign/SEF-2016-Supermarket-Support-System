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

module.exports.getNumberOfSpecials = function(callback){
   var conn = db.getConnection();
   r.table("specials").count().run(conn, function (err, number){
      callback(number);
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
               var specials = [];
               for (var i = 0; i < result.length; i++){
                  specials.push(new Special(result[i]));
               }
               callback(null, specials);
            }
         });
      }
   });
}

module.exports.saveSpecial = function(special, callback){
   var conn = db.getConnection();
   r.table("specials").insert(special, {conflict: "update"}).run(conn, function (err){
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

module.exports.getPageOfSpecials = function(number, offset, callback){
   var conn = db.getConnection();
   r.table("specials").orderBy(r.desc("id")).slice(offset, offset + number).run(conn , function (err, cursor){
      if (err){
         callback(error.ERROR_DATABASE_ERROR, null);
      } else {
         cursor.toArray(function (err, result){
            if (err){
               callback(error.ERROR_DATABASE_ERROR, null);
            } else {
               var specials = [];
               for (var i = 0; i < result.length; i++){
                  var special = new Special(result[i]);
                  specials.push(special);
               }
               callback(null, specials);
            }
         });
      }
   });
}
