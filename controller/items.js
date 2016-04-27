module.exports.run = function(req, res, next, template){
   var data = {};
   console.log(req.cookies);
   res.write(template(data));
   next();
}
