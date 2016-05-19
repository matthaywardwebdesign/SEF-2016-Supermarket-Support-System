var transactions = require("../lib/transactions.js");
var Transaction = require("../lib/transaction.js");

module.exports.run = function(req, res, template){
   var data = {};
   var offset = 0;
   var amount = 8;

   data.currentTransaction = req.cookies.currentTransaction;

   if (req.query.offset != null && req.query.offset != undefined){
      offset = parseInt(req.query.offset);
   }

   if (req.query.amount != null && req.query.amount != undefined){
      amount = parseInt(req.query.amount);
   }

   if (offset > 0){
      data.showBackButton = true;
   }

   data.pageNumber = (offset / amount) + 1;
   data.pageAmount = amount;
   data.offset = offset;
   data.nextOffset = offset + amount;
   data.backOffset = offset - amount;
   if (data.backOffset < 0){
      data.backOffset = 0;
   }

   transactions.getPageOfTransactions(amount, offset, function (err, transactions){
      data.transactions = transactions;
      for (var i = 0; i < data.transactions.length; i++){
         if (data.transactions[i].id == parseInt(req.cookies.currentTransaction)){
            data.transactions[i].currentTransaction = true;
         }

         if (data.transactions[i].status == "open"){
            data.transactions[i].open = true;
         } else {
            data.transactions[i].closed = true;
         }
      }
      if (transactions.length == amount){
         data.showNextButton = true;
      }
      res.end(template(data));
   });
}
