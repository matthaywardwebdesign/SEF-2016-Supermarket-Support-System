var items = require("../lib/items.js");
var item = require("../lib/item.js");

module.exports.run = function(req, res, template){
   var data = {};
   res.end(template(data));
}
