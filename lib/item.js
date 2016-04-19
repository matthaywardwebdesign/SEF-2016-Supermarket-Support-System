var db = require("./db.js");
var r = db.getLibrary();
var error = require("./error.js");

var Item = function(details){
   //Put a || and then a value to specify the default item
   this.id = details.id;
   this.price = details.price || 0.00;
   this.name = details.name || "";
   this.ean = details.ean || 0;
   this.isWeighted = details.isWeighted || false;
   this.soh = details.soh || 0;
};

Item.prototype.getID = function(){
   return this.id;
}

Item.prototype.getPrice = function(){
   return this.price;
}

Item.prototype.setPrice = function(p){
   this.price = p;
}

Item.prototype.getName = function(){
   return this.name;
}

Item.prototype.setName = function(n){
   this.name = n;
}

Item.prototype.setWeighted = function(weighted){
   this.isWeighted = weighted;
}

Item.prototype.isWeighted = function(){
   return this.isWeighted();
}

Item.prototype.getEAN = function(){
   return this.ean;
}

Item.prototype.setEAN = function(e){
   this.ean = e;
}

Item.prototype.addStock = function(amount){
   this.soh += amount;
}

Item.prototype.removeStock = function(amount){
   //Check if stock level will be negative
   if (this.soh - amount < 0){
      return error.ERROR_NEGATIVE_SOH;
   } else {
      this.soh -= amount;
   }
}

Item.prototype.getSOH = function(){
   return this.soh;
}

module.exports = Item;
