var db = require("./db.js");
var r = db.getLibrary();
var error = require("./error.js");
var Supplier = require("./supplier.js");

module.exports.setDB = function(database){
   db = database;
}

module.exports.getSupplierByID = function(id, callback){
   console.log("Editing Supplier " + id);
   var conn = db.getConnection();
   r.table("supplier").get(id).run(conn, function (err, supplier){
      if (err){
         callback(error.ERROR_DATABASE_ERROR, null);
      } else {
         if (supplier == null){
            callback(error.ERROR_CUSTOMER_NO_EXIST, null);
         } else {
            callback(null, new Supplier(suppler));
         }
      }
   });
}

module.exports.getAllSuppliers = function(callback){
   var conn = db.getConnection();
   r.table("suppliers").run(conn, function (err, cursor){
      if (err){
         callback(error.ERROR_DATABASE_ERROR, null);
      } else {
         cursor.toArray(function (err, result){
            if (err){
               callback(error.ERROR_DATABASE_ERROR, null);
            } else {
               var Suppliers = [];
               for (var i = 0; i < result.length; i++){
                  Suppliers.push(new Supplier(result[i]));
               }
               callback(null, Suppliers);
            }
         });
      }
   });
}

module.exports.saveSupplier = function(Supplyer, callback){
   var conn = db.getConnection();
   r.table("suppliers").insert(Supplier, {conflict: "update"}).run(conn, function (err){
      if (err){
         console.log(err);
         callback(error.ERROR_DATABASE_ERROR);
      } else {
         callback(null);
         console.log("Edited Supplier " + Supplier.id);
         console.log("Supplier Name " + Supplier.supplierName + " Supplier Address : " + Supplier.supplyerAddress);
      }
   });
}

module.exports.deleteSupplier = function(Supplier, callback){
   var conn = db.getConnection();
   r.table("supplyers").get(Supplier.getID()).delete().run(conn, function (err){
      if (err){
         callback(error.ERROR_DATABASE_ERROR);
            } else {
         callback(null);
      }
   });
}


module.exports.deleteSupplierByID = function(id, callback){
   var conn = db.getConnection();
   r.table("suppliers").get(id).delete().run(conn, function (err){
      if (err){
         callback(error.ERROR_DATABASE_ERROR);
      } else {
         callback(null);
      }
   });
}

module.exports.getPageOfSuppliers = function(number, offset, sort, callback){
   var conn = db.getConnection();
   r.table("suppliers").orderBy(sort).slice(offset, offset + number).run(conn , function (err, cursor){
      if (err){
         callback(error.ERROR_DATABASE_ERROR, null);
      } else {
         cursor.toArray(function (err, result){
            if (err){
               callback(error.ERROR_DATABASE_ERROR, null);
            } else {
               var suppliers = [];
               for (var i = 0; i < result.length; i++){
                  var supplier = new Supplier(result[i]);
                  suppliers.push(supplier);
               }
               callback(null, suppliers);
            }
         });
      }
   });
}

