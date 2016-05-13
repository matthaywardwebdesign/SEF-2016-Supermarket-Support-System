var db = require("./db.js");
var r = db.getLibrary();
var error = require("./error.js");
var items = require("./items.js");
var item = require("./item.js");
var transactions = require("./transactions.js");

var Transaction = function(details){
   var self = this;
   self.id = details.id;
   self.customerNo = details.customerNo || 0;
   self.date = details.date || new Date();
   self.gst = details.gst || 0.00;
   self.paymentType = details.paymentType || "";
   self.totalBulkDiscount = details.totalBulkDiscount || 0.00;
   self.noTransactionItems = details.noTransactionItems || 0;
   self.total = details.total || 0.00;
   self.gstApplicableTotal = details.gstApplicableTotal || 0.00;
   self.items = details.items || [];

   Transaction.prototype.getID = function(){
      return self.id;
   }

   Transaction.prototype.getCustomerNo = function(){
      return self.customerNo;
   }

   Transaction.prototype.setCustomerNo = function(g){
      self.customerNo = g;
   }

   Transaction.prototype.getDate = function(){
      return self.date;
   }

   Transaction.prototype.setDate = function(d){
      self.date = d;
   }

   Transaction.prototype.getGST = function(){
      return self.gst;
   }

   Transaction.prototype.setGST = function(n){
      self.gst = n;
   }

   Transaction.prototype.getPaymentType = function(){
      return self.paymentType;
   }

   Transaction.prototype.setPaymentType = function(t){
      self.paymentType = t;
   }

   Transaction.prototype.getTotalBulkDiscount = function(){
      return self.totalBulkDiscount;
   }

   Transaction.prototype.setTotalBulkDiscount = function(b){
      self.totalBulkDiscount = b;
   }

   Transaction.prototype.getNoTransactionItems = function(){
      return self.noTransactionItems;
   }

   Transaction.prototype.setNoTransactionItems = function(e){
      self.noTransactionItems = e;
   }

   Transaction.prototype.getTotal = function(){
      return self.total;
   }

   Transaction.prototype.getItems = function(callback){
      var counter = self.items.length;
      var indexLookup = {};
      if (counter == 0){
         callback();
      }
      for (var i = 0; i < counter; i++){
         indexLookup[self.items[i].id] = i;
         items.getItemByID(self.items[i].id, function (err, item){
            if (!err){
               self.items[indexLookup[item.getID()]].item = item;
            }
            counter--;
            if (counter == 0){
               callback(self.items);
            }
         });
      }
   }

   Transaction.prototype.addItem = function(item, qty){
      for (var i = 0; i < self.items.length; i++){
         if (self.items[i].id == item.getID()){
            self.items[i].qty = parseFloat(self.items[i].qty) + parseFloat(qty);
            return;
         }
      }
      self.items.push({
         "id":item.getID(),
         "qty":qty,
         "item":null,
         "lineTotal":0.00
      });
   }

   Transaction.prototype.addItemByID = function(id, qty){
      for (var i = 0; i < self.items.length; i++){
         if (self.items[i].id == id){
            self.items[i].qty = parseFloat(self.items[i].qty) + parseFloat(qty);
            return;
         }
      }
      self.items.push({
         "id":id,
         "qty":qty,
         "item":null,
         "lineTotal":0.00
      });
   }

   Transaction.prototype.removeItem = function(item){
      var items = [];
      var id = item.getID();
      for (var i = 0; i < self.items.length; i++){
         if (self.items[i].id != id){
            items.push(self.items[i]);
         }
      }
      self.items = items;
   }

   Transaction.prototype.removeItemByID = function(id){
      var items = [];
      for (var i = 0; i < self.items.length; i++){
         if (self.items[i].id != id){
            items.push(self.items[i]);
         }
      }
      self.items = items;
   }

   Transaction.prototype.getGSTApplicableTotal = function(){
      return this.gstApplicableTotal;
   }

   Transaction.prototype.calculate = function(callback){
      self.getItems(function (){
         self.total = 0.00;
         self.gstApplicableTotal = 0.00;
         var count = 0;
         for (var i = 0; i < self.items.length; i++){
            var lineTotal = self.items[i].qty * self.items[i].item.price;
            self.items[i].lineTotal = lineTotal;
            if (self.items[i].item.gstApplicable){
               self.gstApplicableTotal += lineTotal;
            }
            count += parseFloat(self.items[i].qty);
            self.total += self.items[i].qty * self.items[i].item.price;
         }
         self.total = self.total;
         self.gst = self.gstApplicableTotal * 0.10;
         self.setNoTransactionItems(count);
         transactions.saveTransaction(self, function(err){
            callback();
         });
      });
   }

   Transaction.prototype.removeTransactionLine = function (id, quantity){
      var items = [];
      for (var i = 0; i < self.items.length; i++){
         if (self.items[i].id != parseInt(id) && self.items[i].qty != parseFloat(quantity)){
            items.push(self.items[i]);
         }
      }
      self.items = items;
   }

};



module.exports = Transaction;
