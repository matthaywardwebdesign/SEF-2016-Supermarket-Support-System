var db = require("./db.js");
var r = db.getLibrary();
var error = require("./error.js");
var Customer = require("./customer.js");

module.exports.setDB = function(database){
   db = database;
}

module.exports.getCustomerByID = function(id, callback){
   console.log(id);
   var conn = db.getConnection();
   r.table("customers").get(id).run(conn, function (err, customer){
      if (err){
         callback(error.ERROR_DATABASE_ERROR, null);
      } else {
         if (customer == null){
            callback(error.ERROR_CUSTOMER_NO_EXIST, null);
         } else {
            callback(null, new Customer(customer));
         }
      }
   });
}

module.exports.getCustomerByFirstName = function(firstName, callback){
   var conn = db.getConnection();
   r.table("customers").filter({"firstName": firstName}).run(conn, function (err, cursor){
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

module.exports.getCustomerByLastName = function(lastName, callback){
   var conn = db.getConnection();
   r.table("customers").filter({"lastName":lastName}).run(conn, function (err, cursor){
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
   r.table("customers").run(conn, function (err, cursor){
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
   r.table("customers").insert(Customer, {conflict: "update"}).run(conn, function (err){
      if (err){
         console.log(err);
         callback(error.ERROR_DATABASE_ERROR);
      } else {
         callback(null);
         console.log("Edited Customer " + Customer.id);
         console.log("Name " + Customer.firstName + " " +Customer.lastName + "| Loyalty Pts : " + Customer.loyaltyPoints);
      }
   });
}

module.exports.deleteCustomer = function(Customer, callback){
   var conn = db.getConnection();
   r.table("customers").get(Customer.getID()).delete().run(conn, function (err){
      if (err){
         callback(error.ERROR_DATABASE_ERROR);
            } else {
         callback(null);
      }
   });
}


module.exports.deleteCustomerByID = function(id, callback){
   var conn = db.getConnection();
   r.table("customers").get(id).delete().run(conn, function (err){
      if (err){
         callback(error.ERROR_DATABASE_ERROR);
      } else {
         callback(null);
      }
   });
}

module.exports.getPageOfCustomers = function(number, offset, sort, callback){
   var conn = db.getConnection();
   r.table("customers").orderBy(sort).slice(offset, offset + number).run(conn , function (err, cursor){
      if (err){
         callback(error.ERROR_DATABASE_ERROR, null);
      } else {
         cursor.toArray(function (err, result){
            if (err){
               callback(error.ERROR_DATABASE_ERROR, null);
            } else {
               var customers = [];
               for (var i = 0; i < result.length; i++){
                  var customer = new Customer(result[i]);
                  customers.push(customer);
               }
               callback(null, customers);
            }
         });
      }
   });
}

