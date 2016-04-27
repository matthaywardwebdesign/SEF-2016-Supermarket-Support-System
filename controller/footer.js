module.exports.run = function(req, res, next, template){
   var data = {};
   res.end(template(data));
}
