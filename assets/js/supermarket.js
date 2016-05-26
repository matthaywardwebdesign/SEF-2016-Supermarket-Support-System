var Supermarket = {};
(function(){

   Supermarket.createTransaction = function(customer, callback){
      API.post("transaction", {"customerNo":customer}, function(data){
         callback(data.id);
      });
   }

   Supermarket.addItem = function(id, quantity, callback){
      API.post("transaction/" + Cookies.get("currentTransaction") + "/items", {id: id, qty: quantity}, function(){
         callback();
      });
   }

   Supermarket.payTransaction = function(method, callback){
      API.post("transaction/" + Cookies.get("currentTransaction") + "/pay", {method: method}, function(){
         Cookies.remove("currentTransaction");
         callback();
      });
   }

   Supermarket.addItemByBarcode = function(barcode){
      Supermarket.getItemByEAN(barcode, function (item){
         if (item.id != null && item.isWeighted == false){
            Supermarket.addItem(item.id, 1, function(){
               if (Cookies.get("beepDisabled") != "true"){
                  var audio = new Audio('assets/beep.mp3');
                  audio.play();
               }
               Supermarket.loadPanel("transaction-details");
            });
         }
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

   Supermarket.getItemByEAN = function(ean, callback){
      API.get("item/ean/" + ean, {}, function (data){
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
         } else if (type == "select"){
            form = form + "<b>" + name + "</b><br><br><select class='form-control' name='" + name + "' id='" + id + "'>";
            for (var j = 0; j < fields[i].values.length; j++){
               var selected = "";
               if (fields[i].values[j].value == data[id]){
                  selected = " selected";
               }
               form = form + "<option value='" + fields[i].values[j].value + "'" + selected + ">" + fields[i].values[j].label + "</option>";
            }
            form = form + "</select><br>";
         } else {
            form = form + "<b>" + name + "</b><br><br><input class='form-control' type='" + type + "' name='" + name + "' id='" + id + "' value='" + value + "' /><br>";
         }
      }
      form = form + "</div>";
      $(selector).append(form);
   }

   Supermarket.say = function(text){
      if (Cookies.get("voiceOverDisabled") != "true"){
         var msg = new SpeechSynthesisUtterance(text);
         window.speechSynthesis.speak(msg);
      }
   }

})();
