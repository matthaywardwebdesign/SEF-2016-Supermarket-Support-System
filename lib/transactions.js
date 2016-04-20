var db = require("./db.js");
var r = db.getLibrary();
var error = require("./error.js");
var Transaction = require("./transactions.js");

module.exports.setDB = function(database){
   db = database;
}



module.exports.getTransactionByTransNo = function(transactions, callback){
   var conn = db.getConnection();
   r.table("transactions").get(transactionNo).filter({"transactionNo": transactionNo}).limit(1).run(conn, function (err, cursor){
      if (err){
         console.log(err);
         callback(error.ERROR_DATABASE_ERROR, null);
         cursor.toArray(function (err, items){
            if (err){
               callback(error.ERROR_DATABASE_ERROR, null);
            } else {
               if (items[0] == null){
                  callback(error.ERROR_ITEM_NO_EXIST, null);
               } else {
                  callback(null, new Transaction(transactions[0]));
               }
            }
         });
      }
   });
}

module.exports.getTransactionByCustNo = function(transactions, callback){
   var conn = db.getConnection();
   r.table("transactions").get(customerNo).filter({"customerNo": customerNo}).limit(1).run(conn, function (err, cursor){
      if (err){
         console.log(err);
         callback(error.ERROR_DATABASE_ERROR, null);
         cursor.toArray(function (err, items){
            if (err){
               callback(error.ERROR_DATABASE_ERROR, null);
            } else {
               if (items[0] == null){
                  callback(error.ERROR_ITEM_NO_EXIST, null);
               } else {
                  callback(null, new Transaction(transactions[0]));
               }
            }
         });
      }
   });
}

module.exports.getTransactionByDate = function(transactions, callback){
   var conn = db.getConnection();
   r.table("transactions").get(date).run(conn, function (err, cursor){
      if (err){
         console.log(err);
         callback(error.ERROR_DATABASE_ERROR, null);
         cursor.toArray(function (err, items){
            if (err){
               callback(error.ERROR_DATABASE_ERROR, null);
            } else {
               if (items[0] == null){
                  callback(error.ERROR_ITEM_NO_EXIST, null);
               } else {
                  callback(null, new Transaction(transactions[0]));
               }
            }
         });
      }
   });
}

module.exports.getAllTransactions = function(transactions, callback){
   var conn = db.getConnection();
   r.table("transactions").get(*).filter({"transactionNo": transactionNo}).run(conn, function (err, cursor){
      if (err){
         console.log(err);
         callback(error.ERROR_DATABASE_ERROR, null);
         cursor.toArray(function (err, items){
            if (err){
               callback(error.ERROR_DATABASE_ERROR, null);
            } else {
               if (items[0] == null){
                  callback(error.ERROR_ITEM_NO_EXIST, null);
               } else {
                  callback(null, new Transaction(transactions[0]));
               }
            }
         });
      }
   });
}

module.exports.saveTransaction = function(transactions, callback){
   var conn = db.getConnection();
   r.table("transactions").insert(transaction, {conflict: "update"}).run(conn, function (err){
      if (err){
         console.log(err);
         callback(error.ERROR_DATABASE_ERROR);
      } else {
         callback(null);
      }
   });
}

module.exports.deleteTransactionByID = function(transactionNo, callback){
   var conn = db.getConnection();
   r.table("transactions").get(transactionNo).delete().run(conn, function (err){
      if (err){
         callback(error.ERROR_DATABASE_ERROR);
      } else {
         callback(null);
      }
   });
}
