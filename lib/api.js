var fs = require("fs");
var express = require('express');
var app = express();
var handlebars = require("handlebars");
var bodyParser = require('body-parser');

app.use(bodyParser.json({}));

app.use('/css', express.static('css'));
app.use('/assets', express.static('assets'));
//Code for the backend api this section must be before the code for the frontend display
//The front end display code serves up files effectively and does some processing of data
//whereas the backend api simply returns data based on some input

//API endpoint for creating a new transaction
//Input: customerNo
//Output: id (of the newly created transaction)
app.post('/api/transaction', function (req, res){
   runAPI(req, res, "api-transaction-create");
});



//Code for the frontend display
app.use(function (req, res, next){
   runView(req, res, next, "header", "header");
});

app.get('/', function (req, res, next) {
  runView(req, res, next, "home", "home");
});

app.use(function (req, res, next){
   runView(req, res, next, "footer", "footer");
});

app.listen(3000, function () {
  console.log('Supermarket Support System listening on port 3000!');
});

function runView(req, res, next, controller, view){
   fs.readFile("view/" + view + ".html", function (err, data){
      if (err){
         res.status(500);
         res.end("Server error - " + err);
         return;
      } else {
         var template = handlebars.compile(data.toString());
         require("../controller/" + controller + ".js").run(req, res, next, template);
      }
   });
}

function runAPI(req, res, controller){
   require("../controller/" + controller + ".js").run(req, res);
}
