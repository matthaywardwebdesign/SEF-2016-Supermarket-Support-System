var specials = require("../lib/specials.js");
var Special = require("../lib/special.js");
module.exports.run = function(req, res){
   var id = parseInt(req.params.id);
   var data = req.body;
   data.id = id;
   data.startDate = new Date(data.startDate);
   data.endDate = new Date(data.endDate);
   var special = new Special(data);
   specials.saveSpecial(special, function (err){
      res.send({"success": true});
   });
}
