var db = require("./db.js");
var r = db.getLibrary();
var error = require("./error.js");

var User = function(details){
   this.id = details.id;
   this.firstName = details.firstName || "";
   this.lastName = details.lastName || "";
   this.userName = details.userName || "";
   this.accessLevel = details.accessLevel || "";
   //this.login = details.login; << This breaks everything
};

User.prototype.getID = function(){
   return this.id;
}

User.prototype.getFirstName = function(){
   return this.firstName;
}

User.prototype.setFirstName = function(d){
   this.firstName = d;
}

User.prototype.getLastName = function(){
   return this.lastName;
}

User.prototype.setLastName = function(l){
 this.lastName = l;
}

User.prototype.getUserName = function(){
   return this.userName;
}

User.prototype.setUserName = function(u){
 this.userName = u;
}

User.prototype.getAccessLevel = function(){
   return this.accessLevel;
}

User.prototype.setAccessLevel = function(a){
 this.accessLevel = a;
}

User.prototype.setLogin = function(g){
 this.setLogin = g;
}

module.exports = User;
