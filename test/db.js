var db = require("../lib/db.js");

// Tests.js is a little library I wrote to add support for running code before
// any test in this file is run and then once all the tests have been run
// because nodeunit didn't support it
var tests = require("../lib/tests.js");
tests.reset();

tests.before = function(done){
   db.connect(function(result){
      done();
   });
}

tests.beforeEach = function(done){
   done();
}

tests.after = function(done){
   var conn = db.getConnection();
   conn.close();
   done();
}

tests.afterEach = function(done){
   done();
}

module.exports.testLibrary = function (test){
   test.expect(1);
   test.notEqual(db.getLibrary(), null, "Failed to access the RethinkDB library");
   test.done();
}

module.exports.testConnection = function (test){
   test.expect(1);
   var conn = db.getConnection();
   test.notEqual(conn, null, "Failed to establish a database connection");
   test.done();
}

module.exports.testQuery = function (test){
   test.expect(1);
   var r = db.getLibrary();
   var conn = db.getConnection();
   r.js("1 + 1").run(conn, function (err, result){
      test.equal(result, 2, "RethinkDB failed to return the correct result for a query");
      test.done();
   });
}

tests.load(module.exports);
