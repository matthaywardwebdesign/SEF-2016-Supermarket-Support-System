// Little module to extend NodeUnit and add support for running code before
// any tests are run in addition to running code after all tests are done.

var started = false;
var totalTests = 0;

module.exports.after = function(){}
module.exports.afterEach = function(){}
module.exports.before = function(){}
module.exports.beforeEach = function(){}

module.exports.load = function(tests){
   tests.setUp = function(done){
      if (started == false){
         totalTests = Object.getOwnPropertyNames(tests).length;
         started = true;
         module.exports.before(function(){
            module.exports.beforeEach(done);
         });
      } else {
         module.exports.beforeEach(done);
      }
   }

   tests.tearDown = function(done){
      totalTests--;
      if (totalTests == 0){
         module.exports.afterEach(function(){
            module.exports.after(done);
         });
      } else {
         module.exports.afterEach(done);
      }
   }
}
