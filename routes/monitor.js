var superagent = require('superagent');
var cheerio = require('cheerio');


module.exports = {
    router: function(req, res, next){
         res.render('monitor', {
                 title: '前端监控',
                 src:"http://m.yy.com/act/qixi2016/pc/list.html",
                 user:req.session.name,
                 userId:req.session.userId
         });    
    },
    getPage:function(req, res, next){
      var url = req.body.url;
      console.log('收到请求'+url)
      superagent.get(url).end(function(err,doc){
           if(err){
              res.json({code: 503, result:0,url:url});
              return next(err);
            }
            var items = [];
            var $ = cheerio.load(doc.text);
            res.json({code: 200, result:1,url:url});

            console.log($.html())
      // $('#topic_list .topic_title').each(function(idx, element) {
      //  var $element = $(element);
      //  items.push({
      //    title: $element.attr('title'),
      //    href: $element.attr('href')
      //  });
      // });
           
   //          items.forEach(function(current,index,element){
   //              console.log(current)
   //          })

      });      
    }
};


