var db = require("./db.js");
var r = db.getLibrary();
var error = require("./error.js");
var items = require("./items.js");
var item = require("./item.js");

var Order = function(details){
   var self = this;
   self.id = details.id;
   self.date = details.date || new Date();
   self.status = details.status || "open";
   self.items = details.items || [];
   self.numberOfItems = 0;
   for (var i = 0; i < self.items.length; i++){
      self.numberOfItems += self.items[i].qty;
   }

   Order.prototype.getID = function(){
      return self.id;
   }

   Order.prototype.getDate = function(){
      return self.date;
   }

   Order.prototype.getStatus = function(){
      return self.status;
   }

   Order.prototype.setStatus = function(s){
      self.status = s;
   }

   Order.prototype.addItem = function(item, qty){
      if (self.getStatus() == "open"){
         for (var i = 0; i < self.items.length; i++){
            if (self.items[i].id == item.getID()){
               //Don't add items to an order that are already part of one
               return;
            }
         }
         self.items.push({
            "id":item.getID(),
            "qty":qty
         });
      }
   }

   Order.prototype.addItemByID = function(id, qty){
      if (self.getStatus() == "open"){
         for (var i = 0; i < self.items.length; i++){
            if (self.items[i].id == id){
               //Don't add items to an order that are already part of one
               return;
            }
         }
         self.items.push({
            "id":id,
            "qty":qty
         });
      }
   }

   Order.prototype.removeItem = function(item){
      if (self.getStatus() == "open"){
         var items = [];
         var id = item.getID();
         for (var i = 0; i < self.items.length; i++){
            if (self.items[i].id != id){
               items.push(self.items[i]);
            }
         }
         self.items = items;
      }
   }

   Order.prototype.removeItemByID = function(id){
      if (self.getStatus() == "open"){
         var items = [];
         for (var i = 0; i < self.items.length; i++){
            if (self.items[i].id != id){
               items.push(self.items[i]);
            }
         }
         self.items = items;
      }
   }

   Order.prototype.confirmOrder = function(){
      if (self.getStatus() != "cancelled"){
         self.setStatus("sent");
      }
   }

   Order.prototype.cancelOrder = function(){
      if (self.getStatus() == "open" || self.getStatus() == "sent"){
         self.setStatus("cancelled");
      }
   }

   Order.prototype.receiveOrder = function(){
      if (self.getStatus() == "dispatched"){
         self.setStatus("received");
      }
   }

   Order.prototype.dispatchOrder = function(){
      if (self.getStatus() == "sent"){
         self.setStatus("dispatched");
      }
   }

}




module.exports = Order;
