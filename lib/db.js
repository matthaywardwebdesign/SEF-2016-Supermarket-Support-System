module.exports.r = require("rethinkdb");
var config = require("../config.json");
var rconn;

module.exports.connect = function(callback){
   module.exports.r.connect({
       db: config.database.db,
       host: config.database.host,
       port: config.database.port
   }, function(err, conn) {
      if (!err){
         rconn = conn;
         callback(null);
      } else {
         callback(err);
      }
   });
}

module.exports.getConnection = function(){
   return rconn;
}

module.exports.getLibrary = function(){
   return module.exports.r;
}
