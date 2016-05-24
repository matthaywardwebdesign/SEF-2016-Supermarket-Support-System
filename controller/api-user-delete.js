var users = require("../lib/users.js");
var User = require("../lib/user.js");

module.exports.run = function(req, res){
   var id = parseInt(req.params.id);
   users.deleteUserByID(id, function (err){
      console.log(err);
      res.send({"success": true});
   });
}