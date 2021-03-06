var items = require("../lib/items.js");
var item = require("../lib/item.js");

module.exports.run = function(req, res, template){
   var data = {};
   var offset = 0;
   var amount = 8;
   var search = req.query.search || "";
   var sort = req.query.sort || "name";

   if (req.query.offset != null && req.query.offset != undefined){
      offset = parseInt(req.query.offset);
   }

   if (req.query.amount != null && req.query.amount != undefined){
      amount = parseInt(req.query.amount);
   }

   if (offset > 0){
      data.showBackButton = true;
   }

   data.pageNumber = (offset / amount) + 1;
   data.pageAmount = amount;
   data.offset = offset;
   data.sort = sort;
   data.nextOffset = offset + amount;
   data.backOffset = offset - amount;
   if (data.backOffset < 0){
      data.backOffset = 0;
   }

   if (search == ""){
      items.getPageOfItems(amount, offset, sort, function (err, items){
         data.items = items;
         for (var i = 0; i < data.items.length; i++){
            data.items[i].soo = data.items[i].getSOO();
         }
         if (items.length == amount){
            data.showNextButton = true;
         }
         res.end(template(data));
      });
   } else {
      data.search = search;
      items.getPageOfSearchItems(search, amount, offset, sort, function (err, items){
         data.items = items;
         for (var i = 0; i < data.items.length; i++){
            data.items[i].soo = data.items[i].getSOO();
         }
         if (items.length == amount){
            data.showNextButton = true;
         }
         res.end(template(data));
      });
   }
}
