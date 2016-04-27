var db = require("../lib/db.js");
var tests = require("../lib/tests.js");
var error = require("../lib/error.js");
tests.reset();
var customers = require("../lib/customers.js");
var Customer = require("../lib/customer.js");

var testData = {
   "id":3115,
   "firstName": "John",
   "lastName": "Smith"
}

tests.before = function(done){
   db.connect(function(result){
      done();
   });
}

tests.beforeEach = function(done){
   var Customer = new Customer(testData);
   Customers.saveCustomer(Customer, function(){
         done();
      });
   };

tests.after = function(done){
   Customers.deleteCustomerByID(testData.id, function(){
      var conn = db.getConnection();
      conn.close();
      done();
   });
}

tests.afterEach = function(done){
   done();
}

module.exports.testGetID = function(test){
   var Customer = new Customer(testData);
   test.expect(1);
   test.equal(Customer.getID(), testData.id, "Failed to get Customer ID");
   test.done();
}

module.exports.testGetFirstName = function(test){
   var Customer = new Customer(testData);
   test.expect(1);
   test.equal(Customer.getFirstName(), testData.firstName, "Failed to get first name of Customer");
   test.done();
}

module.exports.testGetLastName = function(test){
   var Customer = new Customer(testData);
   test.expect(1);
   test.equal(Customer.getLastName(), testData.lastName, "Failed to get last name of Customer");
   test.done();
}


module.exports.testSetLastName = function(test){
   var Customer = new Customer(testData);
   Customer.setLastName("Doe");
   test.expect(1);
   test.equal(Customer.getLastName(), "Doe", "Failed to set Customer last name");
   test.done();
}

module.exports.testSetFirstName = function(test){
   var Customer = new Customer(testData);
   Customer.setFirstName("Jack");
   test.expect(1);
   test.equal(Customer.getFirstName(), "Jack", "Failed to set Customer price");
   test.done();
}

module.exports.testGetCustomerByID = function(test){
   test.expect(3);
   Customers.getCustomerByID(testData.id, function (err, Customer){
      test.equal(err, null, "Failed to retrieve a Customer - " + err);
      test.notEqual(Customer,null,"Failed to retrieve a Customer");
      if (Customer != null){
         test.equal(Customer.getID(), testData.id, "Failed to retrieve a Customer from ID");
      }
      test.done();
   });
}

module.exports.testGetCustomerByFirstName = function(test){
   test.expect(3);
   Customers.getCustomerByFirstName(testData.firstName, function (err, Customer){
      test.equal(err, null, "Failed to retrieve a Customer - " + err);
      test.notEqual(Customer,null,"Failed to retrieve a Customer");
      if (Customer != null){
         test.equal(Customer.getFirstName(), testData.firstName, "Failed to retrieve a Customer from first name");
      }
      test.done();
   });
}

module.exports.testGetCustomerByLastName = function(test){
   test.expect(3);
   Customers.getCustomerByLastName(testData.lastName, function (err, Customer){
      test.equal(err, null, "Failed to retrieve a Customer - " + err);
      test.notEqual(Customer,null,"Failed to retrieve a Customer");
      if (Customer != null){
         test.equal(Customer.getLastName(), testData.lastName, "Failed to retrieve an Customer from last name");
      }
      test.done();
   });
}

module.exports.testDeleteCustomerByID = function(test){
   test.expect(1);
   Customers.deleteCustomerByID(testData.id, function (err, Customer){
      test.equal(Customer,null,"Failed to delete a Customer");
      test.done();
   });
}

module.exports.testDeleteCustomer = function(test){
   test.expect(1);
   var Customer = new Customer(testData);
   Customers.deleteCustomer(Customer, function (err, Customer){
      test.equal(Customer,null,"Failed to delete an Customer");
      test.done();
   });
}
module.exports.testgetAllCustomers = function(test){
   test.expect(1);
   customers.getAllCustomers(function (err, customers){
      test.ok(customers.length > 0,"Failed to list all customers");
      test.done();
   });
}

tests.load(module.exports);
