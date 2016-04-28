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
   var c = new Customer(testData);
   customers.saveCustomer(c, function(){
         done();
      });
   };

tests.after = function(done){
   customers.deleteCustomerByID(testData.id, function(){
      var conn = db.getConnection();
      conn.close();
      done();
   });
}

tests.afterEach = function(done){
   done();
}

module.exports.testGetID = function(test){
   var customer = new Customer(testData);
   test.expect(1);
   test.equal(customer.getID(), testData.id, "Failed to get Customer ID");
   test.done();
}

module.exports.testGetFirstName = function(test){
   var customer = new Customer(testData);
   test.expect(1);
   test.equal(customer.getFirstName(), testData.firstName, "Failed to get first name of Customer");
   test.done();
}

module.exports.testGetLastName = function(test){
   var customer = new Customer(testData);
   test.expect(1);
   test.equal(customer.getLastName(), testData.lastName, "Failed to get last name of Customer");
   test.done();
}


module.exports.testSetLastName = function(test){
   var customer = new Customer(testData);
   customer.setLastName("Doe");
   test.expect(1);
   test.equal(customer.getLastName(), "Doe", "Failed to set Customer last name");
   test.done();
}

module.exports.testSetFirstName = function(test){
   var customer = new Customer(testData);
   customer.setFirstName("Jack");
   test.expect(1);
   test.equal(customer.getFirstName(), "Jack", "Failed to set Customer price");
   test.done();
}

module.exports.testGetCustomerByID = function(test){
   test.expect(3);
   customers.getCustomerByID(testData.id, function (err, customer){
      test.equal(err, null, "Failed to retrieve a Customer - " + err);
      test.notEqual(customer,null,"Failed to retrieve a Customer");
      if (customer != null){
         test.equal(customer.getID(), testData.id, "Failed to retrieve a Customer from ID");
      }
      test.done();
   });
}

module.exports.testGetCustomerByFirstName = function(test){
   test.expect(3);
   customers.getCustomerByFirstName(testData.firstName, function (err, customers){
      test.equal(err, null, "Failed to retrieve a Customer - " + err);
      test.notEqual(customers,null,"Failed to retrieve a Customer");
      if (customers != null){
         test.equal(customers[0].getFirstName(), testData.firstName, "Failed to retrieve a Customer from first name");
      }
      test.done();
   });
}

module.exports.testGetCustomerByLastName = function(test){
   test.expect(3);
   customers.getCustomerByLastName(testData.lastName, function (err, customers){
      test.equal(err, null, "Failed to retrieve a Customer - " + err);
      test.notEqual(customers,null,"Failed to retrieve a Customer");
      if (customers != null){
         test.equal(customers[0].getLastName(), testData.lastName, "Failed to retrieve an Customer from last name");
      }
      test.done();
   });
}

module.exports.testDeleteCustomerByID = function(test){
   test.expect(1);
   customers.deleteCustomerByID(testData.id, function (err){
      test.equal(err,null,"Failed to delete a Customer");
      test.done();
   });
}

module.exports.testDeleteCustomer = function(test){
   test.expect(1);
   var customer = new Customer(testData);
   customers.deleteCustomer(customer, function (err){
      test.equal(err,null,"Failed to delete an Customer");
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
