var db = require("./db.js");
var r = db.getLibrary();
var error = require("./error.js");
var Transaction = require("./transactions.js");

module.exports.setDB = function(database){
   db = database;
}

module.exports.getTransactionByTransNo = function(transactionNo, callback){
   var conn = db.getConnection();
   r.table("transactions").filter({"transactionNo": transactionNo}).limit(1).run(conn, function (err, cursor){
      if (err){
         callback(error.ERROR_DATABASE_ERROR, null);
      } else {
         cursor.toArray(function (err, transactions){
            if (err){
               callback(error.ERROR_DATABASE_ERROR, null);
            } else {
               if (transactions[0] == null){
                  callback(error.ERROR_TRANSACTION_NO_EXIST, null);
               } else {
                  callback(null, new Transaction(transactions[0]));
               }
            }
         });
      }
   });
}

module.exports.getTransactionsByCustNo = function(customerNo, callback){
   var conn = db.getConnection();
   r.table("transactions").filter({"customerNo": customerNo}).run(conn, function (err, cursor){
      if (err){
         callback(error.ERROR_DATABASE_ERROR, null);
      } else {
         cursor.toArray(function (err, result){
            if (err){
               callback(error.ERROR_DATABASE_ERROR, null);
            } else {
               var transactions = [];
               for (var i = 0; i < result.length; i++){
                  transactions.push(new Transaction(result[i]));
               }
               callback(null, transactions);
            }
         });
      }
   });
}

module.exports.getTransactionsByDate = function(date, callback){
   var conn = db.getConnection();
   r.table("transactions").filter({"date":date}).run(conn, function (err, cursor){
      if (err){
         callback(error.ERROR_DATABASE_ERROR, null);
      } else {
         cursor.toArray(function (err, result){
            if (err){
               callback(ERROR_DATABASE_ERROR, null);
            } else {
               var transactions = [];
               for (var i = 0; i < result.length; i++){
                  transactions.push(new Transaction(result[i]));
               }
               callback(null, transactions);
            }
         });
      }
   });
}

module.exports.getAllTransactions = function(callback){
   var conn = db.getConnection();
   r.table("transactions").run(conn, function (err, cursor){
      if (err){
         callback(error.ERROR_DATABASE_ERROR, null);
      } else {
         cursor.toArray(function (err, result){
            if (err){
               callback(error.ERROR_DATABASE_ERROR, null);
            } else {
               var transactions = [];
               for (var i = 0; i < result.length; i++){
                  transactions.push(new Transaction(result[i]));
               }
               callback(null, transactions);
            }
         });
      }
   });
}

module.exports.saveTransaction = function(transaction, callback){
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

module.exports.deleteTransaction = function(transaction, callback){
   var conn = db.getConnection();
   r.table("transactions").filter({"transactionNo": transaction.getTransactionNo()}).delete().run(conn, function (err){
      if (err){
         callback(error.ERROR_DATABASE_ERROR);
            } else {
         callback(null);
      }
   });
}


module.exports.deleteTransactionByNumber = function(transactionNo, callback){
   var conn = db.getConnection();
   r.table("transactions").filter({"transactionNo": transactionNo}).delete().run(conn, function (err){
      if (err){
         callback(error.ERROR_DATABASE_ERROR);
      } else {
         callback(null);
      }
   });
}
