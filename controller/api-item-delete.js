var items = require("../lib/items.js");
var Item = require("../lib/item.js");
module.exports.run = function(req, res){
   var id = parseInt(req.params.id);
   items.deleteItemByID(id, function (err){
      console.log(err);
      res.send({"success": true});
   });
}
