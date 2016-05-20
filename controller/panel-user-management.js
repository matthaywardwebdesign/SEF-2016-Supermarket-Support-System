var users = require("../lib/users.js");
var User = require("../lib/user.js");

module.exports.run = function(req, res, template){
   var data = {};
   var offset = 0;
   var amount = 8;
   var sort = req.query.sort || "name";

   if (req.query.offset != null && req.query.offset != undefined){
      offset = parseInt(req.query.offset);
   }

   if (req.query.amount != null && req.query.amount != undefined){
      amount = parseInt(req.query.amount);
   }

   if (offset > 0){
      data.showBackButton = true;
   }

   data.pageNumber = (offset / amount) + 1;
   data.pageAmount = amount;
   data.offset = offset;
   data.sort = sort;
   data.nextOffset = offset + amount;
   data.backOffset = offset - amount;
   if (data.backOffset < 0){
      data.backOffset = 0;
   }

      users.getPageOfUsers(amount, offset, sort, function (err, users){
         data.users = users;
         if (users.length == amount){
            data.showNextButton = true;
         }
         res.end(template(data));
      }); 
}
