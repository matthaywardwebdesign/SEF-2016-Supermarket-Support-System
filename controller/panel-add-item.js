var items = require("../lib/items.js");
var item = require("../lib/item.js");

module.exports.run = function(req, res, template){
   var data = {};
   var search = req.query.search;
   if (search != null && search.trim() != ""){
      data.search = search;
      items.getPageOfSearchItems(search, 50, 0, "name", function (err, items){
         if (err){res.end(err);return;}
         for (var i = 0; i < items.length; i++){
            if (items[i].getSOH() == 0){
               items[i].noStock = true;
            }
         }
         data.items = items;
         res.end(template(data));
      });
   } else {
      res.end(template(data));
   }
}
