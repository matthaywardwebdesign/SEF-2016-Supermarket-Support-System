var db = require("./db.js");
var r = db.getLibrary();
var error = require("./error.js");

var Special = function(details){
   var self = this;
   this.id = details.id;
   this.name = details.name || "";
   this.minQty = details.minQty ||0;
   this.maxQty = details.maxQty ||0;
   this.type = details.type || "";
   this.amount = details.amount ||0.00;
   this.itemID = details.itemID;
   this.startDate = details.startDate || new Date();
   this.startDate.setHours(0);
   this.startDate.setMinutes(0);
   this.startDate.setSeconds(0);
   this.endDate = details.endDate || new Date();
   this.endDate.setHours(23);
   this.endDate.setMinutes(59);
   this.endDate.setSeconds(59);
   this.applyPerItem = details.applyPerItem || false;
};

Special.prototype.getID = function(){
   return this.id;
}

Special.prototype.getName = function(){
   return this.name;
}

Special.prototype.setName = function(d){
   this.name = d;
}


Special.prototype.getMinQty = function(){
   return this.minQty;
}

Special.prototype.setMinQty = function(l){
 this.minQty = l;
}

Special.prototype.getMaxQty = function(){
   return this.maxQty;
}

Special.prototype.setMaxQty = function(g){
 this.maxQty = g;
}

Special.prototype.getType = function(){
   return this.type;
}

Special.prototype.setType = function(t){
   this.type = t;
}

Special.prototype.getAmount = function(){
   return this.amount;
}

Special.prototype.setAmount = function(a){
   this.amount = a;
}

Special.prototype.getItemID = function(){
   return this.itemID;
}

Special.prototype.setItemID = function(y){
   this.itemID = y;
}

Special.prototype.getStartDate = function(){
   return this.startDate;
}

Special.prototype.setStartDate = function(n){
   n.setHours(0);
   n.setMinutes(0);
   n.setSeconds(0);
   this.startDate = n;
}

Special.prototype.getEndDate = function(){
   return this.endDate;
}

Special.prototype.setEndDate = function(m){
   m.setHours(23);
   m.setMinutes(59);
   m.setSeconds(59);
   this.endDate = m;
}

Special.prototype.isActive = function(){
   var current = new Date().getTime();
   if (this.getStartDate().getTime() <= current && current <= this.getEndDate()){
      return true;
   } else {
      return false;
   }
}

module.exports = Special;
