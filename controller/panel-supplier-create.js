var suppliers = require("../lib/suppliers.js");
var supplier = require("../lib/supplier.js");

module.exports.run = function(req, res, template){
   var data = {};
   data.pageOffset = req.query.pageOffset;
   data.pageAmount = req.query.pageAmount;
   data.search = req.query.search;
   data.sort = req.query.sort;
   res.end(template(data));
}