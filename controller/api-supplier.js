var suppliers = require("../lib/suppliers.js");
var Supplier = require("../lib/supplier.js");
module.exports.run = function(req, res){
   var id = parseInt(req.params.id);
   suppliers.getSupplierByID(id, function (err, supplier){
      if (err || supplier == null || supplier == undefined){
         res.send({});
      } else {
         res.send(supplier);
      }
   });
}