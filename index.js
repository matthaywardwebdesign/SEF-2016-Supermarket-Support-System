var db = require("./lib/db.js");
var r = db.getLibrary();

//Connect to the database
//note - RMIT blocks the port used by RethinkDB, run this code on the server
//or on a non RMIT network

//To run unit tests make sure you have nodeunit installed and run
//
// nodeunit
//

db.connect(function(err){
   if (!err){
      //We have successfully connected to the database
      var conn = db.getConnection();
      r.table("items").count().run(conn, function (err, result){
         console.log("Total items: " + result);
         process.exit(0);
      });
   }
});
