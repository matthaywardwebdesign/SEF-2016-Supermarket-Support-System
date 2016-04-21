var db = require("../lib/db.js");
var tests = require("../lib/tests.js");
var error = require("../lib/error.js");
tests.reset();
var transactions = require("../lib/transactions.js");
var Transaction = require("../lib/transaction.js");

var testData = {
   "transactionNo":40,
   "customerNo":55,
   "date": "Thu Apr 21 2016 10:08:05 GMT+1000 (AEST)",
   "gst":2.90,
   "paymentType":"credit",
   "totalBulkDiscount":0,
   "noTransactionItems":10,
   "total":0.00
}

tests.before = function(done){
   db.connect(function(result){
      done();
   });
}

tests.beforeEach = function(done){
   var transaction = new Transaction(testData);
   transactions.saveTransaction(transaction, function(){
      done();
   });
}

tests.after = function(done){
   transactions.deleteTransactionByNumber(testData.transactionNo, function(){
      var conn = db.getConnection();
      conn.close();
      done();
   });
}

tests.afterEach = function(done){
   done();
}

module.exports.testGetTransactionNo = function(test){
   var transaction = new Transaction(testData);
   test.expect(1);
   test.equal(transaction.getTransactionNo(), testData.transactionNo, "Failed to get transaction number");
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

tests.load(module.exports);
