var API = {};
API.get = function(endpoint, data){
   $.get("/api/" + endpoint, data, function (result){
      callback(result);
   });
}

API.post = function(endpoint, data, callback){
   $.post("/api/" + endpoint, data, function (result){
      callback(result);
   });
}
