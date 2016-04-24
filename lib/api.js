var fs = require("fs");
var express = require('express');
var app = express();
var handlebars = require("handlebars");

app.get('/', function (req, res) {
  runView(req, res, "home", "home");
});

app.listen(3000, function () {
  console.log('Supermarket Support System listening on port 3000!');
});

function runView(req, res, controller, view){
   fs.readFile("view/" + view + ".html", function (err, data){
      if (err){
         res.status(500);
         res.end("Server error - " + err);
         return;
      } else {
         var template = handlebars.compile(data.toString());
         require("../controller/" + controller + ".js").run(req, res, template);
      }
   });
}
