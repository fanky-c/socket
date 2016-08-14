module.exports = {
    router: function(req, res, next){
         res.render('warn', {
                 title: '前端监控',
                 user:req.session.name,
                 userId:req.session.userId
         });            
    }
};


