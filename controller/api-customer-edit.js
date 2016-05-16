var customers = require("../lib/customers.js");
var Customer = require("../lib/customer.js");

module.exports.run = function(req, res){
   var data = req.body;
   var customer = new Customer(data);
   customers.saveCustomer(customer, function (err){
      res.send({"success": true});
   });
}