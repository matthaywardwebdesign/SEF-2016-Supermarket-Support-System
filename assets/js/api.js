var API = {};
API.get = function(endpoint, data, callback){
   $.get("/api/" + endpoint, data, function (result){
      callback(result);
   });
}

API.post = function(endpoint, data, callback){
   $.ajax({
     type: "POST",
     url: "/api/" + endpoint,
     data: JSON.stringify(data),
     contentType: "application/json; charset=utf-8",
     dataType: "json",
     success: callback,
     failure: function(errMsg) {
          console.log(errMsg);
     }
})
}
