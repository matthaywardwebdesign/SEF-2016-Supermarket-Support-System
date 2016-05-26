var orders = require("../lib/orders.js");
var Order = require("../lib/Order.js");
var items = require("../lib/items.js");

module.exports.run = function(req, res, template){
   var data = {};
   data.orderID = req.params.id;
   data.pageOffset = req.query.pageOffset;
   data.pageAmount = req.query.pageAmount;
   orders.getOrderByID(parseInt(data.orderID), function (err, order){
      if (err){
         res.end(err);
      } else {
         var remaining = order.items.length;
         for (var i = 0; i < order.items.length; i++){
            (function(i){
               items.getItemByID(order.items[i].id, function (err, item){
                  remaining--;
                  if (!err && item != null){
                     order.items[i].item = item;
                  }
                  if (remaining == 0){
                     data.order = order;
                     if (data.order.status == "open"){
                        data.order.open = true;
                     }

                     if (data.order.status == "sent"){
                        data.order.sent = true;
                     }

                     if (data.order.status == "dispatched"){
                        data.order.dispatched = true;
                     }

                     if (data.order.status == "received"){
                        data.order.received = true;
                     }

                     if (data.order.status == "open" || data.order.status == "sent"){
                        data.order.canCancel = true;
                     }

                     res.end(template(data));
                  }
               });
            })(i);
         }
      }
   });
}
