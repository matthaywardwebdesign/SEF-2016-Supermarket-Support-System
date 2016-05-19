var transactions = require("../lib/transactions.js");
var Transaction = require("../lib/transaction.js");
module.exports.run = function(req, res){
   var transactionID = req.params.id;
   transactions.getTransactionByID(parseInt(transactionID), function (err, transaction){
      if (err){res.end(err);return;}
      transaction.pay(req.body.method, function (err){
         if (err){res.end(err);return;}
         transactions.saveTransaction(transaction, function(){
            res.send({"success":true});
         });
      });
   });
}
