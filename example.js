//items.js

module.exports.add = function(data, callback){
  r.table("items").insert(data).run(rconn, callback);
}

//This function is not accessible from any other class

function bob(){

}

//app.js

var items = require("./items.js");
items.add({id: 100, name: "Pink Lady Apple", price: 10.40}, function(err){

  
});
