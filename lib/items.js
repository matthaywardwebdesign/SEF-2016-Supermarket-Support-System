var db = require("./db.js");
var r = db.getLibrary();
var Item = require("./item.js");

module.exports.getItemByName = function(name, callback){
   var conn = db.getConnection();
   r.table("items").filter({"name": name}).limit(1)(0).run(conn, function (err, result){
      if (err){
         console.log(err);
         callback(null);
      } else {
         var item = new Item(result.id);
         callback(item);
      }
   });
}
