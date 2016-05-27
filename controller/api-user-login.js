var users = require("../lib/users.js");
var User = require("../lib/user.js");
module.exports.run = function(req, res){
   var username = req.body.username;
   var password = req.body.password;
   users.getUserByUsername(username, function (err, user){
      console.log("User");
      console.log(user);
      if (err || user == null){
         res.send({"token": null});
         return;
      } else {
         user.login(password, function (token){
            console.log(token);
            res.send({"token": token});
            return;
         });
      }
   });
}
