var items = require("../lib/items.js");
var item = require("../lib/item.js");

module.exports.run = function(req, res, template){
   var data = {};
   data.itemID = req.params.id;
   data.pageOffset = req.query.pageOffset;
   data.pageAmount = req.query.pageAmount;
   data.search = req.query.search;
   items.getItemByID(parseInt(data.itemID), function (err, item){
      if (err){
         res.end(err);
      } else {
         data.item = item;
         res.end(template(data));
      }
   });
}
