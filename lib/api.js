var fs = require("fs");
var express = require('express');
var app = express();
var handlebars = require("handlebars");
var bodyParser = require('body-parser');
var cookieParser = require("cookie-parser");
var USE_ALTERNATE_UI = true;

app.use(bodyParser.json({}));
app.use(cookieParser());

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

app.post('/api/user/login', function (req, res){
   runAPI(req, res, "api-user-login");
});

app.post('/api/transaction/:id/items', function(req,res){
   runAPI(req, res, "api-transaction-add-item");
});

app.post('/api/item/:id/edit', function (req ,res){
   runAPI(req, res, "api-item-edit");
});

app.post('/api/supplier/:id/edit', function (req ,res){
   runAPI(req, res, "api-supplier-edit");
});

app.post('/api/special/:id/edit', function (req ,res){
   runAPI(req, res, "api-special-edit");
});

app.post('/api/special/:id/delete', function (req ,res){
   runAPI(req, res, "api-special-delete");
});

app.post('/api/supplier/:id/delete', function (req ,res){
   runAPI(req, res, "api-supplier-delete");
});

app.post('/api/user/:id/edit', function (req ,res){
   runAPI(req, res, "api-user-edit");
});

app.post('/api/customer/:id/edit', function (req ,res){
   runAPI(req, res, "api-customer-edit");
});

app.get('/api/item/:id', function (req, res){
   runAPI(req, res, "api-item");
});

app.get('/api/supplier/:id', function (req, res){
   runAPI(req, res, "api-supplier");
});

app.get('/api/user/:id', function (req, res){
   runAPI(req, res, "api-user");
});

app.get('/api/item/ean/:ean', function (req, res){
   runAPI(req, res, "api-item-ean");
});

app.get('/api/customer/:id', function (req, res){
   runAPI(req, res, "api-customer");
});

app.post('/api/item/:id/delete', function (req ,res){
   runAPI(req, res, "api-item-delete");
});

app.post('/api/order/:id/action/:action', function (req ,res){
   runAPI(req, res, "api-order-action");
});

app.post('/api/user/:id/delete', function (req ,res){
   runAPI(req, res, "api-user-delete");
});

app.post('/api/customer/:id/delete', function (req ,res){
   runAPI(req, res, "api-customer-delete");
});

app.post('/api/transaction/:id/delete', function (req ,res){
   runAPI(req, res, "api-transaction-delete");
});

app.post('/api/transaction/:id/pay', function (req ,res){
   runAPI(req, res, "api-transaction-pay");
});

app.post('/api/transaction/:id/items/remove', function (req ,res){
   runAPI(req, res, "api-transaction-remove-item");
});

//Controllers for panels go here because they don't need the header or the footer
app.get('/panel/transaction-details', function (req, res){
   runView(req, res, null, "panel-transaction-details", "panel-transaction-details");
});

app.get('/panel/call-staff-member', function (req, res){
   runView(req, res, null, "panel-call-staff-member", "panel-call-staff-member");
});

app.get('/panel/login', function (req, res){
   runView(req, res, null, "panel-login", "panel-login");
});

app.get('/panel/add-item', function (req, res){
   runView(req, res, null, "panel-add-item", "panel-add-item");
});

app.get('/panel/item-management', function (req, res){
   runView(req, res, null, "panel-item-management", "panel-item-management");
});

app.get('/panel/supplier-management', function (req, res){
   runView(req, res, null, "panel-supplier-management", "panel-supplier-management");
});

app.get('/panel/user-management', function (req, res){
   runView(req, res, null, "panel-user-management", "panel-user-management");
});

app.get('/panel/customer-management', function (req, res){
   runView(req, res, null, "panel-customer-management", "panel-customer-management");
});

app.get('/panel/item/:id/edit', function (req, res){
   runView(req, res, null, "panel-item-edit", "panel-item-edit");
});

app.get('/panel/supplier/:id/edit', function (req, res){
   runView(req, res, null, "panel-supplier-edit", "panel-supplier-edit");
});

app.get('/panel/user/:id/edit', function (req, res){
   runView(req, res, null, "panel-user-edit", "panel-user-edit");
});

app.get('/panel/customer/:id/edit', function (req, res){
   runView(req, res, null, "panel-customer-edit", "panel-customer-edit");
});

app.get('/panel/order/:id/edit', function (req, res){
   runView(req, res, null, "panel-order-edit", "panel-order-edit");
});

app.get('/panel/transaction/:id/edit', function (req, res){
   runView(req, res, null, "panel-transaction-edit", "panel-transaction-edit");
});

app.get('/panel/special/:id/edit', function (req, res){
   runView(req, res, null, "panel-special-edit", "panel-special-edit");
});

app.get('/panel/item-create', function (req, res){
   runView(req, res, null, "panel-item-create", "panel-item-create");
});

app.get('/panel/supplier-create', function (req, res){
   runView(req, res, null, "panel-supplier-create", "panel-supplier-create");
});

app.get('/panel/special-create', function (req, res){
   runView(req, res, null, "panel-special-create", "panel-special-create");
});

app.get('/panel/user-create', function (req, res){
   runView(req, res, null, "panel-user-create", "panel-user-create");
});


app.get('/panel/customer-create', function (req, res){
   runView(req, res, null, "panel-customer-create", "panel-customer-create");
});

app.get('/panel/item/:id', function (req, res){
   runView(req, res, null, "panel-item-details", "panel-item-details");
});

app.get('/panel/transaction-management', function (req, res){
   runView(req, res, null, "panel-transaction-management", "panel-transaction-management");
});

app.get('/panel/reports', function (req, res){
   runView(req, res, null, "panel-reports", "panel-reports");
});

app.get('/panel/orders', function (req, res){
   runView(req, res, null, "panel-orders", "panel-orders");
});

app.get('/panel/specials', function (req, res){
   runView(req, res, null, "panel-specials", "panel-specials");
});

app.get('/panel/suppliers', function (req, res){
   runView(req, res, null, "panel-suppliers", "panel-suppliers");
});

app.get('/panel/settings', function (req, res){
   runView(req, res, null, "panel-settings", "panel-settings");
});

app.get('/panel/pay-now', function (req, res){
   runView(req, res, null, "panel-pay-now", "panel-pay-now");
});

app.get('/panel/lookup-item', function (req, res){
   runView(req, res, null, "panel-lookup-item", "panel-lookup-item");
});

app.get('/panel/each-selector', function (req, res){
   runView(req, res, null, "panel-each-selector", "panel-each-selector");
});

app.get('/panel/weight-selector', function (req, res){
   runView(req, res, null, "panel-each-selector", "panel-weight-selector");
});

app.get('/panel/report/sales', function (req, res){
   runView(req, res, null, "panel-report-sales", "panel-report-sales");
});

app.get('/panel/report/highest-revenue-items', function (req, res){
   runView(req, res, null, "panel-report-highest-revenue-items", "panel-report-highest-revenue-items");
});

//Code for the frontend display
app.use(function (req, res, next){
   runView(req, res, next, "header", "header");
});

app.get('/', function (req, res, next) {
  runView(req, res, next, "home", "home");
});

app.get('/items', function (req, res, next) {
  runView(req, res, next, "items", "items");
});

app.get('/suppliers', function (req, res, next) {
  runView(req, res, next, "suppliers", "suppliers");
});

app.get('/users', function (req, res, next) {
  runView(req, res, next, "users", "users");
});


app.get('/customers', function (req, res, next) {
  runView(req, res, next, "customers", "customers");
});

app.get('/management', function (req, res, next) {
  runView(req, res, next, "management", "management");
});

app.get('/new', function (req, res, next) {
  runView(req, res, next, "new", "new");
});

app.use(function (req, res, next){
   runView(req, res, next, "footer", "footer");
});

app.listen(3000, function () {
  console.log('Supermarket Support System listening on port 3000!');
});

function runView(req, res, next, controller, view){
   var path = "view/" + view + ".html";
   if (USE_ALTERNATE_UI){
      path = "view/alternate/" + view + ".html";
   }
   fs.readFile(path, function (err, data){
      if (err){
         res.status(500);
         res.end("Server error - " + err);
         return;
      } else {
         var template = handlebars.compile(data.toString());
         if (next == null){
            require("../controller/" + controller + ".js").run(req, res, template);
         } else {
            require("../controller/" + controller + ".js").run(req, res, next, template);
         }
      }
   });
}

function runAPI(req, res, controller){
   require("../controller/" + controller + ".js").run(req, res);
}

handlebars.registerHelper('formatDecimal', function(value) {
    return value.toFixed(2);
});

handlebars.registerHelper('formatBitcoin', function(value) {
    return (value * 0.0016).toFixed(2);
});

handlebars.registerHelper('paymentStatus', function(value) {
    if (value == "paid"){
      return "<span style='color:#1abc9c'>Paid</span>";
   }

   if (value == "open"){
      return "<span style='color:#e67e22'>Open</span>";
   }

   if (value == "cancelled"){
      return "<span style='color:#e74c3c'>Cancelled</span>";
   }
});

handlebars.registerHelper('orderStatus', function(value) {
   if (value == "received"){
      return "<span style='color:#1abc9c'>Received</span>";
   }

   if (value == "dispatched"){
      return "<span style='color:#1abc9c'>Dispatched</span>";
   }

   if (value == "sent"){
      return "<span style='color:#1abc9c'>Sent</span>";
   }

   if (value == "open"){
      return "<span style='color:#e67e22'>Open</span>";
   }

   if (value == "cancelled"){
      return "<span style='color:#e74c3c'>Cancelled</span>";
   }
});

handlebars.registerHelper('sayPrice', function(value) {
    value = value.toFixed(2);
    var dollars = parseInt(value.split(".")[0]);
    var cents = parseInt(value.split(".")[1]);
    if (cents > 0){
      return dollars + " dollars and " + cents + " cents";
   } else {
      return dollars + " dollars";
   }
});

handlebars.registerHelper('niceDate', function (d){
   var months = [
      "January", "February", "March", "April", "May", "June", "July",
      "August", "September", "October", "November", "December"
   ];
   return d.getDate() + ' ' + months[d.getMonth()] + ', ' + d.getFullYear();
});

handlebars.registerHelper('niceDateTime', function (d){
   var months = [
      "January", "February", "March", "April", "May", "June", "July",
      "August", "September", "October", "November", "December"
   ];
   var minutes = d.getMinutes().toString();
   if (minutes.length == 1){
      minutes = "0" + minutes;
   }
   return d.getDate() + ' ' + months[d.getMonth()] + ', ' + d.getFullYear() + ' ' + d.getHours() + ":" + minutes;
});
