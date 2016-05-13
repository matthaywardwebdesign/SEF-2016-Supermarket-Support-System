var transactions = require("../lib/transactions.js");
module.exports.run = function(req, res){
   var id = parseInt(req.params.id);
   transactions.deleteTransactionByID(id, function (err){
      console.log(err);
      res.send({"success": true});
   });
}
