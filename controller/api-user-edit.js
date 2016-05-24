var users = require("../lib/users.js");
var User = require("../lib/user.js");

module.exports.run = function(req, res){
   var data = req.body;
   var user = new User(data);
   users.saveUser(user, function (err){
      res.send({"success": true});
   });
}