var transactions = require("../lib/transactions.js");
var Transaction = require("../lib/transaction.js");
module.exports.run = function(req, res){
   var id = parseInt(req.params.id);
   var item = req.body.id;
   transactions.getTransactionByID(id, function (err, transaction){
      if (err){res.end(err);return;}
      transaction.removeItemByID(item);
      transactions.saveTransaction(transaction, function (err){
         if (err){res.end(err);return;}
         res.send({"success": true});
      });
   });
}
