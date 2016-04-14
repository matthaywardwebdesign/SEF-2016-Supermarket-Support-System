var db = require("./db.js");
var r = db.getLibrary();
var error = require("./error.js");

var Item = function(details){
   //Put a || and then a value to specify the default item
   this.id = details.id;
   this.price = details.price || 0.00;
   this.name = details.name || "";
   this.isWeighted = details.isWeighted || false;
};

Item.prototype.getID = function(){
   return this.id;
}

Item.prototype.getPrice = function(){
   return this.price;
}

Item.prototype.getName = function(){
   return this.name;
}

module.exports = Item;
