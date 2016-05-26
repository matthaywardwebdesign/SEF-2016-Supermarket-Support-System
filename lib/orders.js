var db = require("./db.js");
var r = db.getLibrary();
var error = require("./error.js");
var Order = require("./order.js");

module.exports.setDB = function(database){
   db = database;
}

module.exports.getOrderByID = function(id, callback){
   var conn = db.getConnection();
   r.table("orders").get(id).run(conn, function (err, result){
      if (err){
         callback(error.ERROR_DATABASE_ERROR, null);
      } else {
         if (result != null){
            callback(null, new Order(result));
         } else {
            callback(error.ERROR_ORDER_NO_EXIST, null);
         }
      }
   });
}

module.exports.getLastOrderID = function(callback){
   var conn = db.getConnection();
   r.table("orders").orderBy(r.desc("id")).limit(1)(0)("id").run(conn, function (err, number){
      if (err || number == null || number == undefined){
         callback(1);
      } else {
         callback(number);
      }
   });
}

module.exports.getNumberOfOrders = function(callback){
   var conn = db.getConnection();
   r.table("orders").count().run(conn, function (err, number){
      callback(number);
   });
}


module.exports.getAllOrders = function(callback){
   var conn = db.getConnection();
   r.table("orders").run(conn, function (err, cursor){
      if (err){
         callback(error.ERROR_DATABASE_ERROR, null);
      } else {
         cursor.toArray(function (err, result){
            if (err){
               callback(error.ERROR_DATABASE_ERROR, null);
            } else {
               var orders = [];
               for (var i = 0; i < result.length; i++){
                  orders.push(new Order(result[i]));
               }
               callback(null, orders);
            }
         });
      }
   });
}

module.exports.saveOrder = function(order, callback){
   var conn = db.getConnection();
   r.table("orders").insert(order, {conflict: "update"}).run(conn, function (err){
      if (err){
         console.log(err);
         callback(error.ERROR_DATABASE_ERROR);
      } else {
         callback(null);
      }
   });
}

module.exports.deleteOrder = function(order, callback){
   var conn = db.getConnection();
   r.table("orders").get(order.getID()).delete().run(conn, function (err){
      if (err){
         callback(error.ERROR_DATABASE_ERROR);
            } else {
         callback(null);
      }
   });
}

module.exports.deleteOrderByID = function(id, callback){
   var conn = db.getConnection();
   r.table("orders").get(id).delete().run(conn, function (err){
      if (err){
         callback(error.ERROR_DATABASE_ERROR);
      } else {
         callback(null);
      }
   });
}

module.exports.getPageOfOrders = function(number, offset, callback){
   var conn = db.getConnection();
   r.table("orders").orderBy(r.desc("id")).slice(offset, offset + number).run(conn , function (err, cursor){
      if (err){
         callback(error.ERROR_DATABASE_ERROR, null);
      } else {
         cursor.toArray(function (err, result){
            if (err){
               callback(error.ERROR_DATABASE_ERROR, null);
            } else {
               var orders = [];
               for (var i = 0; i < result.length; i++){
                  var order = new Order(result[i]);
                  orders.push(order);
               }
               callback(null, orders);
            }
         });
      }
   });
}

//Returns an open order to add to or alternatively if one doesn't exist creates
//a new one
module.exports.getOpenOrder = function(callback){
   var order;
   this.getAllOrders(function(err, orders){
      for (var i = 0; i < orders.length; i++){
         if (orders[i].getStatus() == "open"){
            order = orders[i];
            break;
         }
      }

      if (order == null){
         module.exports.getLastOrderID(function (id){
            order = new Order({id: id});
            module.exports.saveOrder(order, function (err){
               callback(order);
            });
         });
      } else {
         callback(order);
      }
   });
}
