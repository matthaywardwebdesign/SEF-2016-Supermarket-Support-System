var Supermarket = {};
(function(){
   Supermarket.createTransaction = function(callback){
      API.post("transaction", {"customerNo":1}, function(data){
         callback(data.id);
      });
   }
})();
