var orders = require("../lib/orders.js");
var Order = require("../lib/Order.js");

module.exports.run = function(req, res){
   var id = parseInt(req.params.id);
   var action = req.params.action;
   orders.getOrderByID(id, function (err, order){
      if (err){res.end(err); return}
      if (action == "send"){
         order.confirmOrder();
      }
      if (action == "dispatch"){
         order.dispatchOrder();
      }
      if (action == "receive"){
         order.receiveOrder();
      }
      if (action == "cancel"){
         order.cancelOrder();
      }
      orders.saveOrder(order, function (err){
         res.send({"success": true});
      });
   });
}
