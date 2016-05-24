var db = require("./db.js");
var r = db.getLibrary();
var error = require("./error.js");
var items = require("./items.js");
var item = require("./item.js");
var specials = require("./specials.js");
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
   self.status = details.status || "open";

   Transaction.prototype.getID = function(){
      return self.id;
   }

   Transaction.prototype.getCustomerNo = function(){
      return self.customerNo;
   }

   Transaction.prototype.setCustomerNo = function(g){
      if (self.getStatus() == "open"){
         self.customerNo = g;
      }
   }

   Transaction.prototype.getDate = function(){
      return self.date;
   }

   Transaction.prototype.setDate = function(d){
      if (self.getStatus() == "open"){
         self.date = d;
      }
   }

   Transaction.prototype.getGST = function(){
      return self.gst;
   }

   Transaction.prototype.setGST = function(n){
      if (self.getStatus() == "open"){
         self.gst = n;
      }
   }

   Transaction.prototype.getPaymentType = function(){
      return self.paymentType;
   }

   Transaction.prototype.setPaymentType = function(t){
      if (self.getStatus() == "open"){
         self.paymentType = t;
      }
   }

   Transaction.prototype.getTotalBulkDiscount = function(){
      return self.totalBulkDiscount;
   }

   Transaction.prototype.setTotalBulkDiscount = function(b){
      if (self.getStatus() == "open"){
         self.totalBulkDiscount = b;
      }
   }

   Transaction.prototype.getNoTransactionItems = function(){
      return self.noTransactionItems;
   }

   Transaction.prototype.setNoTransactionItems = function(e){
      if (self.getStatus() == "open"){
         self.noTransactionItems = e;
      }
   }

   Transaction.prototype.getTotal = function(){
      return self.total;
   }

   Transaction.prototype.setTotal = function(total){
      if (self.getStatus() == "open"){
         self.total = total;
      }
   }

   Transaction.prototype.getStatus = function(){
      return self.status;
   }

   Transaction.prototype.setStatus = function(status){
      if (self.getStatus() == "open"){
         self.status = status;
      }
   }

   Transaction.prototype.pay = function(paymentType, callback){
      if (self.getStatus() == "cancelled"){
         callback("Transaction cancelled");
         return;
      }

      if (self.getStatus() == "paid"){
         callback("Transaction already paid");
         return;
      }

      self.calculate(function(){
         if (self.getNoTransactionItems() == 0){
            callback("Empty transaction");
            return;
         }
         self.setPaymentType(paymentType);
         self.setStatus("paid");
         callback(null);
         return;
      });
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
      if (self.getStatus() != "open"){
         return;
      }
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
      if (self.getStatus() != "open"){
         return;
      }
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
      if (self.getStatus() != "open"){
         return;
      }
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
      if (self.getStatus() != "open"){
         return;
      }
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

   Transaction.prototype.setGSTApplicableTotal = function(total){
      if (self.getStatus() == "open"){
         this.gstApplicableTotal = total;
      }
   }

   Transaction.prototype.calculate = function(callback){
      self.getItems(function (){
         self.setTotal(0.00);
         self.setGSTApplicableTotal(0.00);
         var count = 0;
         var remaining = self.items.length;
         for (var i = 0; i < self.items.length; i++){
            (function(i){
               var lineTotal = self.items[i].qty * self.items[i].item.price;
               self.items[i].lineTotal = lineTotal;
               if (self.items[i].item.gstApplicable){
                  self.gstApplicableTotal += lineTotal;
               }
               count += parseFloat(self.items[i].qty);
               self.getSpecialsForTransactionLine(self.items[i], function (specials){
                  self.items[i].specials = specials;
                  var specialTotal = 0;
                  for (var s = 0; s < specials.length; s++){
                     if (self.items[i].item.gstApplicable){
                        self.gstApplicableTotal -= specials[s].amount;
                     }
                     specialTotal += specials[s].amount;
                  }
                  self.setTotal(self.getTotal() + lineTotal - specialTotal);
                  remaining--;
                  if (remaining == 0){
                     self.setGST(self.getGSTApplicableTotal() * 0.10);
                     self.setNoTransactionItems(count.toFixed(3));
                     transactions.saveTransaction(self, function(err){
                        callback();
                     });
                  }
               });
            })(i);
         }
         if (self.items.length == 0){
            callback();
         }
      });
   }

   Transaction.prototype.getSpecialsForTransactionLine = function(line, callback){
      var item = line.item.id;
      var price = line.item.price;
      var qty = line.qty;
      var time = new Date().getTime();
      var result = [];
      specials.getAllSpecials(function (err, specials){
         if (err){
            callback(result);
            return;
         }

         for (var i = 0; i < specials.length; i++){
            if (time >= new Date(specials[i].startDate).getTime() && time <= new Date(specials[i].endDate).getTime()){
               if (qty >= specials[i].minQty && qty <= specials[i].maxQty && specials[i].itemID == item){
                  //The special applies
                  var s = {};
                  s.name = specials[i].name;
                  s.amount = 0;
                  if (specials[i].type == "percentage"){
                     s.amount = price * qty * (specials[i].amount / 100);
                  } else {
                     s.amount = specials[i].amount;
                     if (specials[i].applyPerItem){
                        s.amount *= qty;
                     }
                  }
                  result.push(s);
               }
            }
         }

         callback(result);
      });
   }

   Transaction.prototype.removeTransactionLine = function (id, quantity){
      if (self.getStatus != "open"){
         return;
      }

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
