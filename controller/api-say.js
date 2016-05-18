var exec = require("child_process").exec;
module.exports.run = function(req, res){
   exec("killall say; say " + req.params.text);
   res.end();
}
