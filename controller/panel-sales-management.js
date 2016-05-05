var items = require("../lib/items.js");
var item = require("../lib/item.js");

module.exports.run = function(req, res, template){
   var data = {};
   items.getAllItems(function (err, items){
      if (err){res.end(err);return;}
      data.items = items;
      res.end(template(data));
   });
}
