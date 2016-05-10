var items = require("../lib/items.js");
var item = require("../lib/item.js");

module.exports.run = function(req, res, template){
   var data = {};
   data.items = [];
   var type = req.query.type;
   var search = req.query.search;

   if(type == "id"){
   	items.getItemByID(function (err, items){
      if (err){res.end(err);return;}
      data.items = [item];
      res.end(template(data));
   	});
   }
   if(type == "ean"){
   	items.getItemByEAN(function(err, items){
   		if (err){res.end(err);return;}
         data.items = [item];
         res.end(template(data));
      });
   }
   if(type == "name"){
   	items.getItemByName(function(err, items){
      if (err){res.end(err);return;}
         data.items = items;
      });
   }
   if(type == null){
   	  res.end();
        return null;
   	}
   }
