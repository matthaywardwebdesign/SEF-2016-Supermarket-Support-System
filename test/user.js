var db = require("../lib/db.js");
var tests = require("../lib/tests.js");
var error = require("../lib/error.js");
tests.reset();
var users = require("../lib/users.js");
var User = require("../lib/user.js");

var testData = {
   "id":1123,
   "firstName": "John",
   "lastName": "Smith",
   "userName": "John777",
   "accessLevel": "N/A",
   "login": true
}

tests.before = function(done){
   db.connect(function(result){
      done();
   });
}

tests.beforeEach = function(done){
   var c = new User(testData);
   users.saveUser(c, function(){
         done();
      });
   };

tests.after = function(done){
   users.deleteUserByID(testData.id, function(){
      var conn = db.getConnection();
      conn.close();
      done();
   });
}

tests.afterEach = function(done){
   done();
}

module.exports.testGetID = function(test){
   var user = new User(testData);
   test.expect(1);
   test.equal(user.getID(), testData.id, "Failed to get User ID");
   test.done();
}

module.exports.testGetFirstName = function(test){
   var user = new User(testData);
   test.expect(1);
   test.equal(user.getFirstName(), testData.firstName, "Failed to get first name of User");
   test.done();
}

module.exports.testGetLastName = function(test){
   var user = new User(testData);
   test.expect(1);
   test.equal(user.getLastName(), testData.lastName, "Failed to get last name of User");
   test.done();
}


module.exports.testSetLastName = function(test){
   var user = new User(testData);
   user.setLastName("Doe");
   test.expect(1);
   test.equal(user.getLastName(), "Doe", "Failed to set User last name");
   test.done();
}

module.exports.testSetFirstName = function(test){
   var user = new User(testData);
   user.setFirstName("Jack");
   test.expect(1);
   test.equal(user.getFirstName(), "Jack", "Failed to set User price");
   test.done();
}

module.exports.testGetUserByID = function(test){
   test.expect(3);
   users.getUserByID(testData.id, function (err, user){
      test.equal(err, null, "Failed to retrieve a User - " + err);
      test.notEqual(user,null,"Failed to retrieve a User");
      if (user != null){
         test.equal(user.getID(), testData.id, "Failed to retrieve a User from ID");
      }
      test.done();
   });
}

module.exports.testGetUserByFirstName = function(test){
   test.expect(3);
   users.getUserByFirstName(testData.firstName, function (err, users){
      test.equal(err, null, "Failed to retrieve a User - " + err);
      test.notEqual(users,null,"Failed to retrieve a User");
      if (users != null){
         test.equal(users[0].getFirstName(), testData.firstName, "Failed to retrieve a User from first name");
      }
      test.done();
   });
}

module.exports.testGetUserByLastName = function(test){
   test.expect(3);
   users.getUserByLastName(testData.lastName, function (err, users){
      test.equal(err, null, "Failed to retrieve a User - " + err);
      test.notEqual(users,null,"Failed to retrieve a User");
      if (users != null){
         test.equal(users[0].getLastName(), testData.lastName, "Failed to retrieve an User from last name");
      }
      test.done();
   });
}

module.exports.testDeleteUserByID = function(test){
   test.expect(1);
   users.deleteUserByID(testData.id, function (err){
      test.equal(err,null,"Failed to delete a User");
      test.done();
   });
}

module.exports.testDeleteUser = function(test){
   test.expect(1);
   var user = new User(testData);
   users.deleteUser(user, function (err){
      test.equal(err,null,"Failed to delete an User");
      test.done();
   });
}
module.exports.testgetAllUsers = function(test){
   test.expect(1);
   users.getAllUsers(function (err, users){
      test.ok(users.length > 0,"Failed to list all users");
      test.done();
   });
}

tests.load(module.exports);
