module.exports.run = function(req, res, next, template){
   var data = {};
   if (req.cookies.currentTransaction != null || req.cookies.currentTransaction != undefined){
      data.inATransaction = true;
   }
   res.write(template(data));
   next();
}
