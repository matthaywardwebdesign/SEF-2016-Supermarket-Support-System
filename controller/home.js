module.exports.run = function(req, res, next, template){
   var data = {};
   data.message = new Date();
   res.write(template(data));
   next();
}