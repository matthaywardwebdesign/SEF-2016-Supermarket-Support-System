var db = require("./lib/db.js");
var items = require("./lib/items.js");
var Item = require("./lib/item.js");
var r = db.getLibrary();
var error = require("./lib/error.js");
var transactions = require("./lib/transactions.js");
var Transaction = require("./lib/transaction.js");
var specials = require("./lib/specials.js");
var Special = require("./lib/special.js");
var orders = require("./lib/orders.js");
var Order = require("./lib/order.js");
var api = require("./lib/api.js");
process.env.TZ = "Australia/Melbourne";

//Connect to the database
//note - RMIT blocks the port used by RethinkDB, run this code on the server
//or on a non RMIT network

//To run unit tests make sure you have nodeunit installed and run
//
// nodeunit
//

db.connect(function(err){
   //var s = new Special({"id": 1, "name":"50% off", "itemID": 33909, "type":"percentage", "minQty": 1, "maxQty":1, "amount": 50});
   //specials.saveSpecial(s, function(){});
});
