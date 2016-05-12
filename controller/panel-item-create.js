var items = require("../lib/items.js");
var item = require("../lib/item.js");

module.exports.run = function(req, res, template){
   var data = {};
   data.pageOffset = req.query.pageOffset;
   data.pageAmount = req.query.pageAmount;
   data.search = req.query.search;
   res.end(template(data));
}
