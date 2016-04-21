var db = require("./db.js");
var r = db.getLibrary();
var error = require("./error.js");

var Transaction = function(details){
   this.transactionNo = details.transactionNo;
   this.customerNo = details.customerNo;
   this.date = details.date || new Date();
   this.gst = details.gst || 0.00;
   this.paymentType = details.paymentType || "";
   this.totalBulkDiscount = details.totalBulkDiscount || 0.00;
   this.noTransactionItems = details.noTransactionItems || 0;
   this.total = details.total ||0.00;
};

Transaction.prototype.getTransactionNo = function(){
   return this.transactionNo;
}

Transaction.prototype.setTransactionNo = function(p){
   this.transactionNo = p;
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


module.exports = Transaction;
