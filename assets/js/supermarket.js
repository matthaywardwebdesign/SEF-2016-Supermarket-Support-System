var Supermarket = {};
(function(){
   Supermarket.createTransaction = function(){
      API.post("transaction", {"customerNo":1}, function(data){console.log(data);});
   }
})();
