var items = require("../lib/items.js");
var Item = require("../lib/item.js");
module.exports.run = function(req, res){
   var id = parseInt(req.params.id);
   items.getItemByID(id, function (err, item){
      if (err || item == null || item == undefined){
         res.send({});
      } else {
         res.send(item);
      }
   });
}
