var suppliers = require("../lib/suppliers.js");
var Supplier = require("../lib/supplier.js");

module.exports.run = function(req, res){
   var data = req.body;
   var supplier = new Supplier(data);
   suppliers.saveSupplier(supplier, function (err){
      res.send({"success": true});
   });
}