var db = require("./db.js");
var r = db.getLibrary();
var error = require("./error.js");

var Item = function(details){
   //Put a || and then a value to specify the default item
   this.id = details.id;
   this.price = details.price || 0.00;
   this.name = details.name || "";
   this.ean = details.ean || "";
   this.isWeighted = details.isWeighted || false;
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

module.exports = Item;
