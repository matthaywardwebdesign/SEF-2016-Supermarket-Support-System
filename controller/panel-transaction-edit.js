var transactions = require("../lib/transactions.js");
var Transaction = require("../lib/transaction.js");

module.exports.run = function(req, res, template){
   var data = {};
   data.transactionID = req.params.id;
   data.pageOffset = req.query.pageOffset;
   data.pageAmount = req.query.pageAmount;
   transactions.getTransactionByID(parseInt(data.transactionID), function (err, transaction){
      if (err){
         res.end(err);
      } else {
         transaction.calculate(function(){
            data.transaction = transaction;
            res.end(template(data));
         });
      }
   });
}
