var customers = require("../lib/customers.js");
var Customer = require("../lib/customer.js");
module.exports.run = function(req, res){
   var id = parseInt(req.params.id);
   customers.getCustomerByID(id, function (err, customer){
      if (err || customer == null || customer == undefined){
         res.send({});
      } else {
         res.send(customer);
      }
   });
}