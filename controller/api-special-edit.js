var specials = require("../lib/specials.js");
var Special = require("../lib/special.js");
module.exports.run = function(req, res){
   var id = req.params.id;
   var data = req.body;
   data.id = id;
   data.startDate = new Date(data.startDate);
   data.endDate = new Date(data.endDate);
   if (data.id == "new" || data.id == null){
      specials.getNumberOfSpecials(function(number){
         data.id = number + 1;
         var special = new Special(data);
         specials.saveSpecial(special, function (err){
            res.send({"success": true});
         });
      });
   } else {
      data.id = parseInt(data.id);
      var special = new Special(data);
      specials.saveSpecial(special, function (err){
         res.send({"success": true});
      });
   }
}
