var items = require("../lib/items.js");
var item = require("../lib/item.js");
var db = require("../lib/db.js");
var r = db.getLibrary();
var rconn = db.getConnection();

module.exports.run = function(req, res, template){
   var data = {};
   data.start = new Date(new Date().getTime() - (7 * 1000 * 60 * 60 * 24));
   data.end = new Date();
   if (req.query.start != null && req.query.end != null){
      data.generated = true;
      data.generatedTime = new Date();

      var start = new Date(parseInt(req.query.start));
      start.setHours(0);
      start.setMinutes(0);
      start.setSeconds(0);
      data.start = new Date(start);

      var end = new Date(parseInt(req.query.end));
      end.setHours(23);
      end.setMinutes(59);
      end.setSeconds(59);
      data.end = new Date(end);

      r.table("transactions").filter(r.row("date").gt(start)).filter(r.row("date").lt(end)).filter({"status":"paid"}).orderBy("id").run(rconn, function (err, result){
         result.toArray(function (err, transactions){
            data.totalTransations = transactions.length;
            data.itemsSold = 0;
            data.totalSales = 0.00;
            data.totalGST = 0.00;
            var days = [];
            var counts = [];
            for (var i = 0; i < transactions.length; i++){
               var date = niceDate(transactions[i].date);
               if (days.indexOf(date) < 0){
                  if (new Date(date).getTime() - new Date(days[days.length - 1]).getTime() > 86400000){
                     var oldDate = days[days.length - 1];
                     var count = (new Date(date).getTime() - new Date(days[days.length - 1]).getTime()) / 86400000;
                     for (var j = 0; j < count; j++){
                        days.push(niceDate(new Date(new Date(oldDate).getTime() + (86400000 * (j + 1)))));
                        counts.push(0);
                     }
                  }
                  days.push(date);
                  counts[counts.length] = 0;
               }
               counts[counts.length - 1]+=parseFloat(transactions[i].total.toFixed(2));
               data.itemsSold += parseFloat(transactions[i].noTransactionItems);
               data.totalSales += parseFloat(transactions[i].total);
               data.totalGST += parseFloat(transactions[i].gst);
            }
            for (var i = 0; i < days.length; i++){
               days[i] = new Date(days[i]).getTime();
            }
            data.days = JSON.stringify(days);
            data.counts = JSON.stringify(counts);
            res.end(template(data));
         });
      });
   } else {
      res.end(template(data));
   }
}

function niceDate(d){
   var months = [
      "January", "February", "March", "April", "May", "June", "July",
      "August", "September", "October", "November", "December"
   ];
   return d.getDate() + ' ' + months[d.getMonth()] + ', ' + d.getFullYear();
}
