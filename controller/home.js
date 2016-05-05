module.exports.run = function(req, res, next, template){
   res.write(template(data));
   next();
}
