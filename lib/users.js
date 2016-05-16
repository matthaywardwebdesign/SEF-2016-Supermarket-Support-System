var db = require("./db.js");
var r = db.getLibrary();
var error = require("./error.js");
var User = require("./user.js");

module.exports.setDB = function(database){
   db = database;
}

module.exports.getUserByID = function(id, callback){
   console.log(id);
   var conn = db.getConnection();
   r.table("users").get(id).run(conn, function (err, user){
      if (err){
         callback(error.ERROR_DATABASE_ERROR, null);
      } else {
         if (user == null){
            callback(error.ERROR_CUSTOMER_NO_EXIST, null);
         } else {
            callback(null, new User(user));
         }
      }
   });
}

module.exports.getUserByFirstName = function(firstName, callback){
   var conn = db.getConnection();
   r.table("users").filter({"firstName": firstName}).run(conn, function (err, cursor){
      if (err){
         callback(error.ERROR_DATABASE_ERROR, null);
      } else {
         cursor.toArray(function (err, result){
            if (err){
               callback(error.ERROR_DATABASE_ERROR, null);
            } else {
               var Users = [];
               for (var i = 0; i < result.length; i++){
                  Users.push(new User(result[i]));
               }
               callback(null, Users);
            }
         });
      }
   });
}

module.exports.getUserByLastName = function(lastName, callback){
   var conn = db.getConnection();
   r.table("users").filter({"lastName":lastName}).run(conn, function (err, cursor){
      if (err){
         callback(error.ERROR_DATABASE_ERROR, null);
      } else {
         cursor.toArray(function (err, result){
            if (err){
               callback(ERROR_DATABASE_ERROR, null);
            } else {
               var Users = [];
               for (var i = 0; i < result.length; i++){
                  Users.push(new User(result[i]));
               }
               callback(null, Users);
            }
         });
      }
   });
}

module.exports.getAllUsers = function(callback){
   var conn = db.getConnection();
   r.table("users").run(conn, function (err, cursor){
      if (err){
         callback(error.ERROR_DATABASE_ERROR, null);
      } else {
         cursor.toArray(function (err, result){
            if (err){
               callback(error.ERROR_DATABASE_ERROR, null);
            } else {
               var Users = [];
               for (var i = 0; i < result.length; i++){
                  Users.push(new User(result[i]));
               }
               callback(null, Users);
            }
         });
      }
   });
}

module.exports.saveUser = function(User, callback){
   var conn = db.getConnection();
   r.table("users").insert(User, {conflict: "update"}).run(conn, function (err){
      if (err){
         console.log(err);
         callback(error.ERROR_DATABASE_ERROR);
      } else {
         callback(null);
      }
   });
}

module.exports.deleteUser = function(User, callback){
   var conn = db.getConnection();
   r.table("users").get(User.getID()).delete().run(conn, function (err){
      if (err){
         callback(error.ERROR_DATABASE_ERROR);
            } else {
         callback(null);
      }
   });
}


module.exports.deleteUserByID = function(id, callback){
   var conn = db.getConnection();
   r.table("users").get(id).delete().run(conn, function (err){
      if (err){
         callback(error.ERROR_DATABASE_ERROR);
      } else {
         callback(null);
      }
   });
}

module.exports.getPageOfUsers = function(number, offset, sort, callback){
   var conn = db.getConnection();
   r.table("users").orderBy(sort).slice(offset, offset + number).run(conn , function (err, cursor){
      if (err){
         callback(error.ERROR_DATABASE_ERROR, null);
      } else {
         cursor.toArray(function (err, result){
            if (err){
               callback(error.ERROR_DATABASE_ERROR, null);
            } else {
               var users = [];
               for (var i = 0; i < result.length; i++){
                  var user = new User(result[i]);
                  users.push(user);
               }
               callback(null, users);
            }
         });
      }
   });
}

