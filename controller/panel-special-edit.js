var specials = require("../lib/specials.js");
var Special = require("../lib/special.js");
var items = require("../lib/items.js");

module.exports.run = function(req, res, template){
   var data = {};
   data.specialID = req.params.id;
   data.pageOffset = req.query.pageOffset;
   data.pageAmount = req.query.pageAmount;
   specials.getSpecialByID(parseInt(data.specialID), function (err, special){
      if (err){
         res.end(err);
      } else {
         items.getItemByID(special.itemID, function (err, item){
            if (!err && item != null){
               data.special = special;
               data.item = item;
               res.end(template(data));
            }
         });
      }
   });
}
