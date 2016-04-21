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
   "customerNo":55,
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
   "soh":0
}

tests.before = function(done){
   db.connect(function(result){
      done();
   });
}

tests.beforeEach = function(done){
   var transaction = new Transaction(testData);
   var item = new Item(testItemData);
   transactions.saveTransaction(transaction, function(){
      items.saveItem(item, function(){
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


tests.load(module.exports);
