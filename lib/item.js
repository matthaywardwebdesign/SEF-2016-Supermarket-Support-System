var db = require("./db.js");
var r = db.getLibrary();

var Item = function(id){
   this.id = id;
};

Item.prototype.getID = function(){
   return this.id;
}

Item.prototype.getDetails = function(callback){
   var conn = db.getConnection();
   r.table("items").filter({"id": this.id}).limit(1)(0).run(conn, function (err, item){
      if (err){
         callback(null);
      } else {
         callback(item);
      }
   });
}

module.exports = Item;
