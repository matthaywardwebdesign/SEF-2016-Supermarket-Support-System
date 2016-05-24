var db = require("../lib/db.js");
var tests = require("../lib/tests.js");
var error = require("../lib/error.js");
tests.reset();
var specials = require("../lib/specials.js");
var Special = require("../lib/special.js");

var testData = {
   "id":3451,
   "name": "discount banana",
   "minQty": 2 ,
   "maxQty": 8 ,
    "type": "percentage" ,
    "amount": 4.50 ,
    "itemID": 1 ,
    "startDate": new Date() ,
    "endDate": new Date()
}

tests.before = function(done){
   db.connect(function(result){
      done();
   });
}

tests.beforeEach = function(done){
   var c = new Special(testData);
   specials.saveSpecial(c, function(){
         done();
      });
   };

tests.after = function(done){
   specials.deleteSpecialByID(testData.id, function(){
      var conn = db.getConnection();
      conn.close();
      done();
   });
}

tests.afterEach = function(done){
   done();
}

module.exports.testGetID = function(test){
   var special = new Special(testData);
   test.expect(1);
   test.equal(special.getID(), testData.id, "Failed to get Special ID");
   test.done();
}

module.exports.testGetName = function(test){
   var special = new Special(testData);
   test.expect(1);
   test.equal(special.getName(), testData.name, "Failed to get name of Special");
   test.done();
}


module.exports.testSetName = function(test){
   var special = new Special(testData);
   special.setName("cheap banana");
   test.expect(1);
   test.equal(special.getName(), "cheap banana", "Failed to set Special name");
   test.done();
}

module.exports.testGetMinQty = function(test){
   var special = new Special(testData);
   test.expect(1);
   test.equal(special.getMinQty(), testData.minQty, "Failed to get minQty of Special");
   test.done();
}


module.exports.testSetMinQty = function(test){
   var special = new Special(testData);
   special.setMinQty(3);
   test.expect(1);
   test.equal(special.getMinQty(), 3, "Failed to set Special min qty");
   test.done();
}


module.exports.testGetMaxQty = function(test){
   var special = new Special(testData);
   test.expect(1);
   test.equal(special.getMaxQty(), testData.maxQty, "Failed to get maxQty of Special");
   test.done();
}


module.exports.testSetMaxQty = function(test){
   var special = new Special(testData);
   special.setMaxQty(9);
   test.expect(1);
   test.equal(special.getMaxQty(), 9, "Failed to set Special max qty");
   test.done();
}

module.exports.testGetType = function(test){
   var special = new Special(testData);
   test.expect(1);
   test.equal(special.getType(), testData.type, "Failed to get type of Special");
   test.done();
}

module.exports.testSetType = function(test){
   var special = new Special(testData);
   special.setType("percent");
   test.expect(1);
   test.equal(special.getType(), "percent", "Failed to set Special type");
   test.done();
}


module.exports.testGetAmount = function(test){
   var special = new Special(testData);
   test.expect(1);
   test.equal(special.getAmount(), testData.amount, "Failed to get amount of Special");
   test.done();
}


module.exports.testSetAmount = function(test){
   var special = new Special(testData);
   special.setAmount(5.00);
   test.expect(1);
   test.equal(special.getAmount(), 5.00, "Failed to set Special amount");
   test.done();
}

module.exports.testGetItemID = function(test){
   var special = new Special(testData);
   test.expect(1);
   test.equal(special.getItemID(), testData.itemID, "Failed to get itemID of Special");
   test.done();
}


module.exports.testSetItemID = function(test){
   var special = new Special(testData);
   special.setItemID(5);
   test.expect(1);
   test.equal(special.getItemID(), 5, "Failed to set Special item ID");
   test.done();
}


module.exports.testGetStartDate = function(test){
   var special = new Special(testData);
   test.expect(1);
   test.equal(special.getStartDate(), testData.startDate, "Failed to get start date of a Special");
   test.done();
}

module.exports.testGetEndDate = function(test){
   var special = new Special(testData);
   test.expect(1);
   test.equal(special.getEndDate(), testData.endDate, "Failed to get end date of a Special");
   test.done();
}

module.exports.testGetSpecialByID = function(test){
   test.expect(3);
   specials.getSpecialByID(testData.id, function (err, special){
      test.equal(err, null, "Failed to retrieve a Special - " + err);
      test.notEqual(special,null,"Failed to retrieve a Special");
      if (special != null){
         test.equal(special.getID(), testData.id, "Failed to retrieve a Special from ID");
      }
      test.done();
   });
}

module.exports.testGetSpecialByItemID = function(test){
   test.expect(3);
   specials.getSpecialByItemID(testData.itemID, function (err, specials){
      test.equal(err, null, "Failed to retrieve a Special - " + err);
      test.notEqual(specials,null,"Failed to retrieve a Special");
      if (specials != null){
         test.equal(specials[0].getItemID(), testData.itemID, "Failed to retrieve a Special from item ID");
      }
      test.done();
   });
}


module.exports.testDeleteSpecialByID = function(test){
   test.expect(1);
   specials.deleteSpecialByID(testData.id, function (err){
      test.equal(err,null,"Failed to delete a Special");
      test.done();
   });
}

module.exports.testDeleteSpecial = function(test){
   test.expect(1);
   var special = new Special(testData);
   specials.deleteSpecial(special, function (err){
      test.equal(err,null,"Failed to delete an Special");
      test.done();
   });
}
module.exports.testgetAllSpecials = function(test){
   test.expect(1);
   specials.getAllSpecials(function (err, specials){
      test.ok(specials.length > 0,"Failed to list all specials");
      test.done();
   });
}

tests.load(module.exports);
