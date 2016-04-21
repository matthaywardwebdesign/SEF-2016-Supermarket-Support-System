var db = require("./db.js");
var r = db.getLibrary();
var error = require("./error.js");
var items = require("./items.js");
var item = require("./item.js");

var Transaction = function(details){
   this.id = details.id;
   this.customerNo = details.customerNo;
   this.date = details.date || new Date();
   this.gst = details.gst || 0.00;
   this.paymentType = details.paymentType || "";
   this.totalBulkDiscount = details.totalBulkDiscount || 0.00;
   this.noTransactionItems = details.noTransactionItems || 0;
   this.total = details.total ||0.00;
   this.items = [];
};

Transaction.prototype.getID = function(){
   return this.id;
}

Transaction.prototype.getCustomerNo = function(){
   return this.customerNo;
}

Transaction.setCustomerNo = function(g){
   this.customerNo = g;
}

Transaction.prototype.getDate = function(){
   return this.date;
}

Transaction.prototype.setDate = function(d){
   this.date = d;
}

Transaction.prototype.getGST = function(){
   return this.gst;
}

Transaction.prototype.setGST = function(n){
   this.gst = n;
}

Transaction.prototype.getPaymentType = function(){
   return this.paymentType;
}

Transaction.prototype.setPaymentType = function(t){
   this.paymentType = t;
}

Transaction.prototype.getTotalBulkDiscount = function(){
   return this.totalBulkDiscount;
}

Transaction.prototype.setTotalBulkDiscount = function(b){
   this.totalBulkDiscount = b;
}

Transaction.prototype.getNoTransactionItems = function(){
   return this.noTransactionItems;
}

Transaction.prototype.setNoTransactionItems = function(e){
   this.noTransactionItems = e;
}

Transaction.prototype.getTotal = function(){
   return this.total;
}

Transaction.prototype.getItems = function(callback){
   var counter = this.items.length;
   var output = [];
   for (var i = 0; i < counter; i++){
      items.getItemByID(this.items[i], function (err, item){
         if (!err){
            output.push(item);
         }
         counter--;
         if (counter == 0){
            callback(output);
         }
      });
   }
}

Transaction.prototype.addItem = function(item){
   this.items.push(item.getID());
}

Transaction.prototype.addItemByID = function(id){
   this.items.push(id);
}

Transaction.prototype.removeItem = function(item){
   var id = item.getID();
   for (var i = 0; i < this.items.length; i++){
      if (this.items[i] == id){
         delete this.items[i];
         return;
      }
   }
}

Transaction.prototype.removeItemByID = function(id){
   for (var i = 0; i < this.items.length; i++){
      if (this.items[i] == id){
         delete this.items[i];
         return;
      }
   }
}


module.exports = Transaction;
