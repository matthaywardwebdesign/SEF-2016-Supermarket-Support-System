var db = require("./db.js");
var r = db.getLibrary();
var error = require("./error.js");

var Special = function(details){
   this.id = details.id;
   this.name = details.name || "";
   this.minQty = details.minQty ||0;
   this.maxQty = details.maxQty ||0;
   this.type = details.type || "";
   this.amount = details.amount ||0.00;
   this.itemID = details.itemID;
   this.startDate = details.startDate || new Date();
   this.endDate = details.endDate || new Date();

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
   this.startDate = n;
}

Special.prototype.getEndDate = function(){
   return this.endDate;
}

Special.prototype.setEndDate = function(m){
   this.endDate = m;
}
module.exports = Special;
