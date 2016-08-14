module.exports = {
    router: function(req, res, next){
         res.render('report', {
                 title: '前端监控',
                 user:req.session.name,
                 userId:req.session.userId
         });    
    }
};


