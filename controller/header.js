module.exports.run = function(req, res, next, template){
   var data = {};
   data.page = {"title": "SEF Supermarket Support System"};
   if (req.cookies.currentTransaction != null || req.cookies.currentTransaction != undefined){
      data.inATransaction = true;
   }
   res.write(template(data));
   next();
}
