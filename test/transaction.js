var db = require("../lib/db.js");
var tests = require("../lib/tests.js");
var error = require("../lib/error.js");
tests.reset();
var transactions = require("../lib/transactions.js");
var Transaction = require("../lib/transaction.js");

var testData = {
   "transactionNo":40,
   "customerNo":55,
   "date": '2016-1-03 12:55:40',
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
   var transaction = new transaction(testData);
   transactions.saveTransaction(transaction, function(){
      done();
   });
}

tests.after = function(done){
   transactions.deleteTransactionByID(testData.transactionNo, function(){
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
   test.equal(transaction.getTransactionNo(), testData.transactionNo, "Failed to get transaction ID");
   test.done();
}

module.exports.testGetCustomerNo = function(test){
   var transaction = new Transaction(testData);
   test.expect(1);
   test.equal(transaction.getCustomerNo(), testData.customerNo, "Failed to get cusomter number");
   test.done();
}

module.exports.testGetDate = function(test){
   var transaction = new Transaction(testData);
   test.expect(1);
   test.equal(transaction.getDate(), testData.date, "Failed to get date of transaction");
   test.done();
}