var db = require("./db.js");
var r = db.getLibrary();
var error = require("./error.js");
var users = require("./users.js");

var User = function(details){
   this.id = details.id;
   this.firstName = details.firstName || "";
   this.lastName = details.lastName || "";
   this.userName = details.userName || "";
   this.accessLevel = details.accessLevel || "";
   this.password = details.password || "";
   this.token = details.token || "";
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


User.prototype.setPassword = function(password){
   this.password = password;
}

User.prototype.setToken = function(token){
   this.token = token;
}

User.prototype.login = function(p,callback){
   var self = this;
   if (p == this.password){
      this.setToken(randomString(10));
      users.saveUser(this, function (err){
         callback(self.token);
      });
   } else {
      callback(null);
   }
}

function randomString(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for(var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

module.exports = User;
