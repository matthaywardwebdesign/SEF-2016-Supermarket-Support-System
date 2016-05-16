var db = require("./lib/db.js");
var items = require("./lib/items.js");
var Item = require("./lib/item.js");
var r = db.getLibrary();
var error = require("./lib/error.js");
var transactions = require("./lib/transactions.js");
var Transaction = require("./lib/transaction.js");
var api = require("./lib/api.js");

//Connect to the database
//note - RMIT blocks the port used by RethinkDB, run this code on the server
//or on a non RMIT network

//To run unit tests make sure you have nodeunit installed and run
//
// nodeunit
//

db.connect(function(err){

});
