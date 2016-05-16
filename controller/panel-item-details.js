var items = require("../lib/items.js");
var item = require("../lib/item.js");

module.exports.run = function(req, res, template){
   var data = {};
   data.id = req.params.id;
   items.getItemByID(parseInt(data.id), function (err, item){
      if (err){
         res.end(err);
      } else {
         data.item = item;
         res.end(template(data));
      }
   });
}
