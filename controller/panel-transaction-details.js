var transactions = require("../lib/transactions.js");
var Transaction = require("../lib/transaction.js");

module.exports.run = function(req, res, template){
   var data = {};
   var transactionID = parseInt(req.cookies.currentTransaction);
   transactions.getTransactionByID(transactionID, function (err, transaction){
      if (err){res.end(err);return;}
         transaction.calculate(function (){
            console.log(transaction);
            data.transaction = transaction;
            res.end(template(data));
         });
   });
}
