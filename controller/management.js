module.exports.run = function(req, res, next, template){
   var data = {};
   res.write(template(data));
   next();
}
