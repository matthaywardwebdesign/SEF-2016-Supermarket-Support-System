var customers = require("../lib/customers.js");
var customer = require("../lib/customer.js");

module.exports.run = function(req, res, template){
   var data = {};
   data.id = req.params.id;
   data.pageOffset = req.query.pageOffset;
   data.pageAmount = req.query.pageAmount;
   data.search = req.query.search;
   data.sort = req.query.sort;
   customers.getCustomerByID(parseInt(data.id), function (err, customer){
      if (err){
         res.end(err);
      } else {
         data.customer = customer;
         res.end(template(data));
      }
   });
}