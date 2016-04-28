var db = require("./db.js");
var r = db.getLibrary();
var error = require("./error.js");

var Customer = function(details){
   this.id = details.id;
   this.firstName = details.firstName || "";
   this.lastName = details.lastName || "";

};

Customer.prototype.getID = function(){
   return this.id;
}

Customer.prototype.getFirstName = function(){
   return this.firstName;
}

Customer.prototype.setFirstName = function(d){
   this.firstName = d;
}


Customer.prototype.getLastName = function(){
   return this.lastName;
}

Customer.prototype.setLastName = function(l){
 this.lastName = l;
}

module.exports = Customer;
