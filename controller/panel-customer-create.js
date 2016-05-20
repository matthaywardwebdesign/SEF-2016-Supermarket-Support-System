var customers = require("../lib/customers.js");
var customer = require("../lib/customer.js");

module.exports.run = function(req, res, template){
   var data = {};
   data.pageOffset = req.query.pageOffset;
   data.pageAmount = req.query.pageAmount;
   data.search = req.query.search;
   data.sort = req.query.sort;
   res.end(template(data));
}