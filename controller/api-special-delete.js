var specials = require("../lib/specials.js");
var Special = require("../lib/special.js");
module.exports.run = function(req, res){
   var id = parseInt(req.params.id);
   specials.deleteSpecialByID(id, function (err){
      console.log(err);
      res.send({"success": true});
   });
}
