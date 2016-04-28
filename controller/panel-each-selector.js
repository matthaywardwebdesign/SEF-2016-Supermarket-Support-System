var items = require("../lib/items.js");
var Item = require("../lib/item.js");

module.exports.run = function(req, res, template){
   var data = {};
   items.getItemByID(parseInt(req.cookies.currentItem), function (err, item){
      if (err){res.end(err);return;}
      data.item = item;
      res.end(template(data));
   });
}
