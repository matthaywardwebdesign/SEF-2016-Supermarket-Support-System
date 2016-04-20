var db = require("../lib/db.js");
var tests = require("../lib/tests.js");
var error = require("../lib/error.js");
tests.reset();
var items = require("../lib/items.js");
var Item = require("../lib/item.js");

var testData = {
   "id":1,
   "name":"Test Banana",
   "isWeighted": true,
   "price":2.90,
   "ean":4011,
   "soh":0
}

tests.before = function(done){
   db.connect(function(result){
      done();
   });
}

tests.beforeEach = function(done){
   var item = new Item(testData);
   items.saveItem(item, function(){
      done();
   });
}

tests.after = function(done){
   items.deleteItemByID(testData.id, function(){
      var conn = db.getConnection();
      conn.close();
      done();
   });
}

tests.afterEach = function(done){
   done();
}

module.exports.testGetID = function(test){
   var item = new Item(testData);
   test.expect(1);
   test.equal(item.getID(), testData.id, "Failed to get item ID");
   test.done();
}

module.exports.testGetPrice = function(test){
   var item = new Item(testData);
   test.expect(1);
   test.equal(item.getPrice(), testData.price, "Failed to get item price");
   test.done();
}

module.exports.testSetPrice = function(test){
   var item = new Item(testData);
   item.setPrice(4.00);
   test.expect(1);
   test.equal(item.getPrice(), 4.00, "Failed to set item price");
   test.done();
}

module.exports.testGetName = function(test){
   var item = new Item(testData);
   test.expect(1);
   test.equal(item.getName(), testData.name, "Failed to get item name");
   test.done();
}

module.exports.testSetName = function(test){
   var item = new Item(testData);
   item.setName("Orange Valencia");
   test.expect(1);
   test.equal(item.getName(), "Orange Valencia", "Failed to set item name");
   test.done();
}

module.exports.testGetEAN = function(test){
   var item = new Item(testData);
   test.expect(1);
   test.equal(item.getEAN(), testData.ean, "Failed to get item EAN");
   test.done();
}

module.exports.testSetEAN = function(test){
   var item = new Item(testData);
   item.setEAN(1234);
   test.expect(1);
   test.equal(item.getEAN(), 1234, "Failed to set item EAN");
   test.done();
}

module.exports.testIsWeighted = function(test){
   var item = new Item(testData);
   test.expect(1);
   test.equal(item.isWeightedItem(), true, "Failed to get isWeighted value of item");
   test.done();
}

module.exports.testSetWeighted = function(test){
   var item = new Item(testData);
   test.expect(1);
   item.setWeightedItem(false);
   test.equal(item.isWeightedItem(), false, "Failed to set isWeighted value of item");
   test.done();
}

module.exports.testGetSOH = function(test){
   var item = new Item(testData);
   test.expect(1);
   test.equal(item.getSOH(), 0, "Failed to get item SOH");
   test.done();
}

module.exports.testAddStock = function(test){
   var item = new Item(testData);
   test.expect(1);
   item.addStock(50);
   test.equal(item.getSOH(), 50, "Failed to add stock to an item");
   test.done();
}

module.exports.testRemoveStock = function(test){
   var item = new Item(testData);
   test.expect(2);
   item.addStock(50);
   item.removeStock(45);
   test.equal(item.getSOH(), 5, "Failed to remove stock from an item");
   test.equal(item.removeStock(20), error.ERROR_NEGATIVE_SOH, "Failed to return error for attempting to make SOH negative");
   test.done();
}

module.exports.testGetItemByID = function(test){
   test.expect(3);
   items.getItemByID(testData.id, function (err, item){
      test.equal(err, null, "Failed to retrieve an item - " + err);
      test.notEqual(item,null,"Failed to retrieve an item");
      if (item != null){
         test.equal(item.getID(), testData.id, "Failed to retrieve an item");
      }
      test.done();
   });
}

module.exports.testGetItemByName = function(test){
   test.expect(3);
   items.getItemByName(testData.name, function (err, item){
      test.equal(err, null, "Failed to retrieve an item - " + err);
      test.notEqual(item,null,"Failed to retrieve an item");
      if (item != null){
         test.equal(item.getName(), testData.name, "Failed to retrieve an item");
      }
      test.done();
   });
}

module.exports.testGetItemByEAN = function(test){
   test.expect(3);
   items.getItemByEAN(testData.ean, function (err, item){
      test.equal(err, null, "Failed to retrieve an item - " + err);
      test.notEqual(item,null,"Failed to retrieve an item");
      if (item != null){
         test.equal(item.getEAN(), testData.ean, "Failed to retrieve an item");
      }
      test.done();
   });
}

tests.load(module.exports);
