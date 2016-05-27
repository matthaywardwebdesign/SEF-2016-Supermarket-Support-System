var suppliers = require("../lib/suppliers.js");
var Supplier = require("../lib/supplier.js");

module.exports.run = function(req, res, template){
   var data = {};
   data.supplierID = req.params.id;
   data.pageOffset = req.query.pageOffset;
   data.pageAmount = req.query.pageAmount;
   suppliers.getSupplierByID(parseInt(data.supplierID), function (err, supplier){
      if (err){
         res.end(err);
      } else {
         data.supplier = supplier;
         res.end(template(data));
      }
   });
}
