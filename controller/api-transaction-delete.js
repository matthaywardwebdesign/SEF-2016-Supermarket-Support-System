var transactions = require("../lib/transactions.js");
module.exports.run = function(req, res){
   var id = parseInt(req.params.id);
   transactions.getTransactionByID(id, function (err, transaction){
      if (err){res.send(err);return;}
      transaction.cancel();
      transactions.saveTransaction(transaction, function(){
         res.send({"success": true});
      });
   });
}
