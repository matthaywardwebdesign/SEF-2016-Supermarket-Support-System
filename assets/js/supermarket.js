var Supermarket = {};
(function(){
   Supermarket.createTransaction = function(callback){
      API.post("transaction", {"customerNo":1}, function(data){
         callback(data.id);
      });
   }

   Supermarket.addItem = function(id, quantity, callback){
      API.post("transaction/" + Cookies.get("currentTransaction") + "/items", {id: id, qty: quantity}, function(){
         callback();
      });
   }

   Supermarket.loadPanel = function(panel){
      $("#panel-holder").load("/panel/" + panel);
   }
})();
