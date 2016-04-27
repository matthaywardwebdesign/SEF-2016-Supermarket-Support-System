var transactions = require("../lib/transactions.js");
var Transaction = require("../lib/transaction.js");
module.exports.run = function(req, res){
   transactions.getNumberOfTransactions(function (lastTransactionID){
      var newID = lastTransactionID + 1;
      var t = new Transaction({"id":newID, "customerNo": req.body.customerNo, "date": new Date()});
      transactions.saveTransaction(t, function (err){
         if (err){
            res.send({"err": err});
            res.end();
         } else {
            res.send({"id": newID});
         }
      });
   });
}
