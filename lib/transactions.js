var db = require("./db.js");
var r = db.getLibrary();
var error = require("./error.js");
var Transaction = require("./transaction.js");

module.exports.setDB = function(database){
   db = database;
}

module.exports.getTransactionByID = function(id, callback){
   var conn = db.getConnection();
   r.table("transactions").get(id).run(conn, function (err, result){
      if (err){
         callback(error.ERROR_DATABASE_ERROR, null);
      } else {
         if (result != null){
            callback(null, new Transaction(result));
         } else {
            callback(error.ERROR_TRANSACTION_NO_EXIST, null);
         }
      }
   });
}

module.exports.getNumberOfTransactions = function(callback){
   var conn = db.getConnection();
   r.table("transactions").count().run(conn, function (err, number){
      callback(number);
   });
}

module.exports.getLastTransactionID = function(callback){
   var conn = db.getConnection();
   r.table("transactions").orderBy(r.desc("id")).limit(1)(0)("id").run(conn, function (err, number){
      if (err || number == null){
         callback(1);
      }
      callback(number);
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
   r.table("transactions").get(transaction.getID()).delete().run(conn, function (err){
      if (err){
         callback(error.ERROR_DATABASE_ERROR);
            } else {
         callback(null);
      }
   });
}


module.exports.deleteTransactionByID = function(id, callback){
   var conn = db.getConnection();
   r.table("transactions").get(id).delete().run(conn, function (err){
      if (err){
         callback(error.ERROR_DATABASE_ERROR);
      } else {
         callback(null);
      }
   });
}

module.exports.getPageOfTransactions = function(number, offset, callback){
   var conn = db.getConnection();
   r.table("transactions").orderBy(r.desc("id")).slice(offset, offset + number).run(conn , function (err, cursor){
      if (err){
         callback(error.ERROR_DATABASE_ERROR, null);
      } else {
         cursor.toArray(function (err, result){
            if (err){
               callback(error.ERROR_DATABASE_ERROR, null);
            } else {
               var transactions = [];
               for (var i = 0; i < result.length; i++){
                  var transaction = new Transaction(result[i]);
                  transactions.push(transaction);
               }
               callback(null, transactions);
            }
         });
      }
   });
}
