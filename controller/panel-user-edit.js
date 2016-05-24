var users = require("../lib/users.js");
var User = require("../lib/user.js");

module.exports.run = function(req, res, template){
   var data = {};
   data.id = req.params.id;
   data.pageOffset = req.query.pageOffset;
   data.pageAmount = req.query.pageAmount;
   data.search = req.query.search;
   data.sort = req.query.sort;
   users.getUserByID(parseInt(data.id), function (err, user){
      if (err){
         res.end(err);
      } else {
         data.user = user;
         res.end(template(data));
      }
   });
}