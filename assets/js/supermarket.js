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

   Supermarket.getItemByID = function(id, callback){
      API.get("item/" + id, {}, function (data){
         callback(data);
      });
   }

   Supermarket.getCustomerByID = function(id, callback){
      API.get("customer/" + id, {}, function (data){
         callback(data);
      });
   }

   Supermarket.loadBlackoutPanel = function(panel){
      $(".blackout").fadeIn();
      $(".blackout-panel").load("/panel/" + panel);
   }

   Supermarket.showItemDetails = function(id){
      Supermarket.loadBlackoutPanel("item/" + id);
   }

   Supermarket.hideBlackoutPanel = function(){
      $(".blackout").fadeOut();
   }

   Supermarket.createForm = function(selector, id, fields, data){
      var form = "<div id='form-" + id + "'>";
      for (var i = 0; i < fields.length; i++){
         var type = fields[i].type;
         var name = fields[i].name;
         var id = fields[i].id;
         var value = data[id] || "";
         if (type == "checkbox"){
            var checked = "";
            if (value == true){
               checked = "checked";
            }
            form = form + "<b>" + name + "</b><input class='form-control' type='" + type + "' name='" + name + "' id='" + id + "' " + checked + " /><br>";
         } else {
            form = form + "<b>" + name + "</b><br><br><input class='form-control' type='" + type + "' name='" + name + "' id='" + id + "' value='" + value + "' /><br>";
         }
      }
      form = form + "</div>";
      $(selector).append(form);
   }

})();
