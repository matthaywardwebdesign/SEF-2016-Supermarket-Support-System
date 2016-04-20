var db = require("../lib/db.js");
var tests = require("../lib/tests.js");
tests.reset();
var items = require("../lib/items.js");
var Item = require("../lib/item.js");

tests.before = function(done){
   db.connect(function(result){
      done();
   });
}

tests.beforeEach = function(done){
   var item = new Item({
      "id":1,
      "name":"Test Banana",
      "isWeighted": true,
      "price":2.90,
      "ean":4011,
      "soh":0
   });
   items.saveItem(item, function(){
      done();
   });
}

tests.after = function(done){
   items.deleteItemByID(1, function(){
      var conn = db.getConnection();
      conn.close();
      done();
   });
}

tests.afterEach = function(done){
   done();
}

module.exports.testGetItemByID = function(test){
   test.expect(2);
   items.getItemByID(1, function (err, item){
      test.equal(err, null, "Failed to retrieve an item - " + err);
      test.equal(item.getID(),1,"Failed to retrieve an item");
      test.done();
   });
}

tests.load(module.exports);
