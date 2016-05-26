var orders = require("../lib/orders.js");
var Order = require("../lib/order.js");
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

   orders.getPageOfOrders(amount, offset, function (err, orders){
      data.orders = orders;
      if (orders.length == amount){
         data.showNextButton = true;
      }
      res.end(template(data));
   });
}
