module.exports.run = function(req, res, template){
   var data = {};
   res.end(template(data));
}
