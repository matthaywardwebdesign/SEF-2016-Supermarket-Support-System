var db = require("./db.js");
var r = db.getLibrary();
var error = require("./error.js");

var Supplier = function(details){
   this.id = details.id;
   this.supplierName = details.supplierName || "";
   this.supplierAddress = details.supplierAddress || "";
};

Supplier.prototype.getID = function(){
   return this.id;
}

Supplier.prototype.getSupplierName = function(){
   return this.supplierName;
}

Supplier.prototype.setSupplierName = function(d){
   this.supplierName = d;
}

Supplier.prototype.getSupplierAddress = function(){
   return this.supplierAddress;
}

Supplier.prototype.setSupplierAddress = function(d){
   this.supplierAddress = d;
}

module.exports = Supplier;
