var items = require("../lib/items.js");
var Item = require("../lib/item.js");
module.exports.run = function(req, res){
   var ean = parseInt(req.params.ean);
   items.getItemByEAN(ean, function (err, item){
      if (err || item == null || item == undefined){
         res.send({});
      } else {
         res.send(item);
      }
   });
}
