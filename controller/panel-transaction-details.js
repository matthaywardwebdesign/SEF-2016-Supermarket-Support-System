var transactions = require("../lib/transactions.js");
var Transaction = require("../lib/transaction.js");

module.exports.run = function(req, res, template){
   var data = {};
   var transactionID = parseInt(req.cookies.currentTransaction);
   transactions.getTransactionByID(transactionID, function (err, transaction){
      if (err){res.end(err);return;}
      data.transaction = transaction;
      transaction.getItems(function (items){
         if (err){res.end(err);return;}
         transaction.calculateTotal(function (total){
            data.transaction.items = items;
            data.transaction.total = total.toFixed(2);
            res.end(template(data));
         });
      });
   });
}
