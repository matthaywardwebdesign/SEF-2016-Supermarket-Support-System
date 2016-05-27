var users = require("../lib/users.js");
module.exports.run = function(req, res, next, template){
   var data = {};
   var token = req.query.token;
   users.getAccessTypeFromToken(token, function (accessLevel){
      data.accessLevel = accessLevel;
      if (accessLevel == null){
         data.accessNone = true;
      }
      if (accessLevel == "sales"){
         data.accessLevelSales = true;
         data.accessTransactions = true;
         data.accessCustomers = true;
      }
      if (accessLevel == "warehouse"){
         data.accessLevelWarehouse = true;
         data.accessOrders = true;
         data.accessItems = true;
      }
      if (accessLevel == "manager"){
         data.accessLevelManager = true;
         data.accessItems = true;
         data.accessTransactions = true;
         data.accessOrders = true;
         data.accessSpecials = true;
         data.accessReports = true;
         data.accessCustomers = true;
         data.accessUsers = true;
      }
      res.write(template(data));
      next();
   });
}
