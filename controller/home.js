module.exports.run = function(req, res, template){
   var data = {};
   data.message = new Date();
   res.end(template(data));
}
