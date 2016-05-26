var suppliers = require("../lib/suppliers.js");
var Supplier = require("../lib/supplier.js");
module.exports.run = function(req, res){
   var id = parseInt(req.params.id);
   suppliers.deleteSupplierByID(id, function (err){
      console.log(err);
      res.send({"success": true});
   });
}