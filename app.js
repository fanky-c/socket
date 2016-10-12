var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');         //打印日志
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');

var app = express();



//引用artTemplate模块
var template = require('art-template');
app.set('views', path.join(__dirname, 'views'));
template.config('base', '');
template.config('extname', '.html');
app.engine('.html', template.__express);
app.set('view engine', 'html');

/**
   helper 
**/
template.helper('toSting',function(id){
    return id.toString();
});



// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
//app.use(logger('dev'));  //打印日志
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret:'socket',
    resave:true,
    name:'socket',
    saveUninitialized:true,
    cookie:{
        maxAge:1000*60*100 //过期时间设置(单位毫秒)
    }
}));

//日志
var log4js = require('log4js');
log4js.configure({
  appenders: [
        {
          type: 'DateFile',
          filename: 'public/accesslog/access.log',
          pattern: '-yyyy-MM-dd.log',
          alwaysIncludePattern: true,
          category: 'access'
        },
        { 
           type: 'console'           
        }
  ]
});
app.use(log4js.connectLogger(log4js.getLogger('access'), { level: log4js.levels.INFO }));


//允许跨域
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    if(req.method=="OPTIONS") res.send(200);/*让options请求快速返回*/
    else  next();
});


//路由设置
var routes = require('./routes/routes');
app.use('/', routes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});




// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

exports.listen = function (_server) {
    return io.listen(_server);
};

module.exports = app;
