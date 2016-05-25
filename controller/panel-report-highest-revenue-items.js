var items = require("../lib/items.js");
var item = require("../lib/item.js");
var db = require("../lib/db.js");
var r = db.getLibrary();
var rconn = db.getConnection();

module.exports.run = function(req, res, template){
   var data = {};
   data.start = new Date(new Date().getTime() - (7 * 1000 * 60 * 60 * 24));
   data.end = new Date();
   data.numItems = 10;
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

      var numItems = parseInt(req.query.numItems);
      data.numItems = numItems;

      var itemsList = {};
      var sorted = [];
      r.table("transactions").filter(r.row("date").gt(start)).filter(r.row("date").lt(end)).filter({"status":"paid"}).orderBy("id").run(rconn, function (err, result){
         result.toArray(function (err, transactions){
            for (var i = 0; i < transactions.length; i++){
               for (var j = 0; j < transactions[i].items.length; j++){
                  var itemID = parseInt(transactions[i].items[j].id);
                  console.log(itemID);
                  if (itemsList[itemID] == undefined){
                     itemsList[itemID] = 0;
                  }
                  itemsList[itemID] += transactions[i].items[j].lineTotal;
               }
            }
            while (Object.keys(itemsList).length != 0 && numItems > 0){
               var biggest = 0;
               var biggestName = "";
               var keys = Object.keys(itemsList);
               for (var i = 0; i < keys.length; i++){
                  if (itemsList[keys[i]] > biggest){
                     biggest = itemsList[keys[i]];
                     biggestName = keys[i];
                  }
               }
               sorted.push({"name":biggestName, "revenue": biggest});
               delete itemsList[biggestName];
               numItems--;
            }
            var remaining = sorted.length;
            console.log(sorted);
            for (var i = 0; i < sorted.length; i++){
               (function(i){
                  items.getItemByID(parseInt(sorted[i].name), function (err, item){
                     remaining--;
                     if (item != null){
                        sorted[i].item = item;
                     }
                     if (remaining == 0){
                        data.sorted = sorted;
                        res.end(template(data));
                     }
                  });
               })(i);
            }
         });
      });
   } else {
      res.end(template(data));
   }
}
