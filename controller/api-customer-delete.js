var customers = require("../lib/customers.js");
var Customer = require("../lib/customer.js");
module.exports.run = function(req, res){
   var id = parseInt(req.params.id);
   customers.deleteCustomerByID(id, function (err){
      console.log(err);
      res.send({"success": true});
   });
}