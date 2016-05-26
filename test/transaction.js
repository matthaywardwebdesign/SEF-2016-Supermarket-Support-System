var db = require("../lib/db.js");
var tests = require("../lib/tests.js");
var error = require("../lib/error.js");
tests.reset();
var transactions = require("../lib/transactions.js");
var Transaction = require("../lib/transaction.js");
var items = require("../lib/items.js");
var Item = require("../lib/item.js");

var testData = {
   "id":40,
   "customerNo":1,
   "date": "Thu Apr 21 2016 10:08:05 GMT+1000 (AEST)",
   "gst":2.90,
   "paymentType":"credit",
   "totalBulkDiscount":0,
   "noTransactionItems":10,
   "total":0.00
}

var testItemData = {
   "id":1,
   "name":"Test Banana",
   "isWeighted": true,
   "price":2.90,
   "ean":4011,
   "soh":0,
   "gstApplicable":false
}

var testItem2Data = {
   "id":2,
   "name":"Test Cocopops",
   "isWeighted": false,
   "price":6.50,
   "ean":9300123456789,
   "soh":0,
   "gstApplicable":true
}

tests.before = function(done){
   db.connect(function(result){
      done();
   });
}

tests.beforeEach = function(done){
   var transaction = new Transaction(testData);
   var item = new Item(testItemData);
   var item2 = new Item(testItem2Data);
   transactions.saveTransaction(transaction, function(){
      items.saveItem([item, item2], function(){
         done();
      });
   });

}

tests.after = function(done){
   transactions.deleteTransactionByID(testData.id, function(){
      var conn = db.getConnection();
      conn.close();
      done();
   });
}

tests.afterEach = function(done){
   done();
}

module.exports.testGetTransactionID = function(test){
   var transaction = new Transaction(testData);
   test.expect(1);
   test.equal(transaction.getID(), testData.id, "Failed to get transaction number");
   test.done();
}

module.exports.testGetCustomerNo = function(test){
   var transaction = new Transaction(testData);
   test.expect(1);
   test.equal(transaction.getCustomerNo(), testData.customerNo, "Failed to get customer number");
   test.done();
}

module.exports.testGetDate = function(test){
   var transaction = new Transaction(testData);
   test.expect(1);
   test.equal(transaction.getDate(), testData.date, "Failed to get date of transaction");
   test.done();
}

module.exports.testGetGST = function(test){
   var transaction = new Transaction(testData);
   test.expect(1);
   test.equal(transaction.getGST(), testData.gst, "Failed to get item GST");
   test.done();
}

module.exports.testGetPaymentType = function(test){
   var transaction = new Transaction(testData);
   test.expect(1);
   test.equal(transaction.getPaymentType(), testData.paymentType, "Failed to get transaction payment type");
   test.done();
}

module.exports.testGetTotalBulkDiscount = function(test){
   var transaction = new Transaction(testData);
   test.expect(1);
   test.equal(transaction.getTotalBulkDiscount(), testData.totalBulkDiscount, "Failed to get transaction bulk discount");
   test.done();
}

module.exports.testGetNoTransactionItems = function(test){
   var transaction = new Transaction(testData);
   test.expect(1);
   test.equal(transaction.getNoTransactionItems(), testData.noTransactionItems, "Failed to get number of transaction items");
   test.done();
}

module.exports.testGetTotal = function(test){
   var transaction = new Transaction(testData);
   test.expect(1);
   test.equal(transaction.getTotal(), testData.total, "Failed to get transaction total");
   test.done();
}

module.exports.testAddItemByID = function(test){
   var transaction = new Transaction(testData);
   test.expect(2);
   transaction.addItemByID(testItemData.id,3);
   test.equal(transaction.items[0].id, testItemData.id,"Failed to add item to transaction");
   test.equal(transaction.items[0].qty, 3,"Failed to add item to transaction");
   test.done();
}

module.exports.testGetItems = function(test){
   var transaction = new Transaction(testData);
   test.expect(5);
   transaction.addItemByID(testItemData.id, 2);
   transaction.getItems(function(items){
      test.ok(items.length > 0, "Failed to retreive transaction items");
      test.equal(items[0].item.id, testItemData.id, "Failed to retrive transaction items");
      test.equal(items[0].item.price, testItemData.price, "Failed to retreive transaction items");
      test.equal(items[0].qty, 2, "Failed to retrieve transaction items");
      test.ok(items[0].lineTotal >= 0, "Failed to retrieve transaction items");
      test.done();
   });
}

module.exports.testCalculate = function(test){
   var transaction = new Transaction(testData);
   transaction.addItemByID(testItemData.id, 2.5);
   transaction.addItemByID(testItem2Data.id, 4);
   test.expect(4);
   transaction.calculate(function(){
      test.equal(transaction.getTotal(), testItemData.price * 2.5 + testItem2Data.price * 4, "Failed to calculate transaction total correctly");
      test.equal(transaction.getGST(), testItem2Data.price * 4 * 0.10, "Failed to calculate GST correctly");
      test.equal(transaction.getNoTransactionItems(), 6.5, "Failed to correctly calculate number of transaction items");
      test.equal(transaction.getGSTApplicableTotal(), testItem2Data.price * 4, "Failed to correctly calculate GST Applicable total");
      test.done();
   });
}


tests.load(module.exports);
