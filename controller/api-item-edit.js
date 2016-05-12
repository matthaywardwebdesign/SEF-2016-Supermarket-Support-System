var items = require("../lib/items.js");
var Item = require("../lib/item.js");
module.exports.run = function(req, res){
   var id = req.params.id;
   var data = req.body;
   var item = new Item(data);
   items.saveItem(item, function (err){
      res.send({"success": true});
   });
}
