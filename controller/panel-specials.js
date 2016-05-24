var specials = require("../lib/specials.js");
var Special = require("../lib/special.js");
var items = require("../lib/items.js");
var Item = require("../lib/item.js");

module.exports.run = function(req, res, template){
   var data = {};
   var offset = 0;
   var amount = 8;

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
   data.nextOffset = offset + amount;
   data.backOffset = offset - amount;
   if (data.backOffset < 0){
      data.backOffset = 0;
   }

   specials.getPageOfSpecials(amount, offset, function (err, specials){
      data.specials = specials;
      if (specials.length == amount){
         data.showNextButton = true;
      }
      for (var i = 0; i < specials.length; i++){
         specials[i].active = specials[i].isActive();
      }
      res.end(template(data));
   });
}
