var users = require("../lib/users.js");
var User = require("../lib/user.js");
module.exports.run = function(req, res){
   var id = parseInt(req.params.id);
   users.getUserByID(id, function (err, user){
      if (err || user == null || user == undefined){
         res.send({});
      } else {
         res.send(user);
      }
   });
}