var items = require("../lib/items.js");
var item = require("../lib/item.js");
var suppliers = require("../lib/suppliers.js");
var supplier = require("../lib/supplier.js");

module.exports.run = function(req, res, template){
   var data = {};
   data.itemID = req.params.id;
   data.pageOffset = req.query.pageOffset;
   data.pageAmount = req.query.pageAmount;
   data.search = req.query.search;
   data.sort = req.query.sort;
   items.getItemByID(parseInt(data.itemID), function (err, item){
      if (err){
         res.end(err);
      } else {
         data.item = item;
         suppliers.getAllSuppliers(function(err, result){
            var options = [];
            for(var i = 0; i < result.length; i++ ){
               options.push({"label":result[i].supplierName, "value":result[i].id});
            }
            data.suppliers = options;
            res.end(template(data));
         });
      }
   });
}
