var db = require("./db.js");
var r = db.getLibrary();
var error = require("./error.js");
var Transaction = require("./transactions.js");

module.exports.setDB = function(database){
   db = database;
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