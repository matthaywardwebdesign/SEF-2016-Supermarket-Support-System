module.exports.run = function(req, res, next, template){
   var data = {};
   data.page = {"title": "SEF Supermarket Support System"};
   res.write(template(data));
   next();
}
