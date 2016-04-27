var db = require("./db.js");
var r = db.getLibrary();
var error = require("./error.js");
var Customer = require("./customers.js");

module.exports.setDB = function(database){
   db = database;
}

module.exports.getCustomerByID = function(id, callback){
   var conn = db.getConnection();
   r.table("Customers").get(id).run(conn, function (err, Customer){
      if (err){
         callback(error.ERROR_DATABASE_ERROR, null);
      } else {
         callback(null, Customer);
      }
   });
}

module.exports.getCustomerByFirstName = function(firstName, callback){
   var conn = db.getConnection();
   r.table("Customers").filter({"firstName": firstName}).run(conn, function (err, cursor){
      if (err){
         callback(error.ERROR_DATABASE_ERROR, null);
      } else {
         cursor.toArray(function (err, result){
            if (err){
               callback(error.ERROR_DATABASE_ERROR, null);
            } else {
               var Customers = [];
               for (var i = 0; i < result.length; i++){
                  Customers.push(new Customer(result[i]));
               }
               callback(null, Customers);
            }
         });
      }
   });
}

module.exports.getCustomerByLastName = function(date, callback){
   var conn = db.getConnection();
   r.table("Customers").filter({"lastName":lastName}).run(conn, function (err, cursor){
      if (err){
         callback(error.ERROR_DATABASE_ERROR, null);
      } else {
         cursor.toArray(function (err, result){
            if (err){
               callback(ERROR_DATABASE_ERROR, null);
            } else {
               var Customers = [];
               for (var i = 0; i < result.length; i++){
                  Customers.push(new Customer(result[i]));
               }
               callback(null, Customers);
            }
         });
      }
   });
}

module.exports.getAllCustomers = function(callback){
   var conn = db.getConnection();
   r.table("Customers").run(conn, function (err, cursor){
      if (err){
         callback(error.ERROR_DATABASE_ERROR, null);
      } else {
         cursor.toArray(function (err, result){
            if (err){
               callback(error.ERROR_DATABASE_ERROR, null);
            } else {
               var Customers = [];
               for (var i = 0; i < result.length; i++){
                  Customers.push(new Customer(result[i]));
               }
               callback(null, Customers);
            }
         });
      }
   });
}

module.exports.saveCustomer = function(Customer, callback){
   var conn = db.getConnection();
   r.table("Customers").insert(Customer, {conflict: "update"}).run(conn, function (err){
      if (err){
         console.log(err);
         callback(error.ERROR_DATABASE_ERROR);
      } else {
         callback(null);
      }
   });
}

module.exports.deleteCustomer = function(Customer, callback){
   var conn = db.getConnection();
   r.table("Customers").get(Customer.getID()).delete().run(conn, function (err){
      if (err){
         callback(error.ERROR_DATABASE_ERROR);
            } else {
         callback(null);
      }
   });
}


module.exports.deleteCustomerByID = function(id, callback){
   var conn = db.getConnection();
   r.table("Customers").get(id).delete().run(conn, function (err){
      if (err){
         callback(error.ERROR_DATABASE_ERROR);
      } else {
         callback(null);
      }
   });
}
