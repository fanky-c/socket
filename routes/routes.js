var express = require('express');
var router = express.Router();
var UsersModels = require('../models/users'); //数据操作对象
var fs = require('fs');
var path = require('path');
var io = require('socket.io')();
var index = require('./index');
var brief = require('./brief');
var warn = require('./warn');
var monitor = require('./monitor');
var report = require('./report');
var config = require('./config');
var system = require('./system');
var users = require('./users');

/**
    操作cookie
**/
function setCookie(res, name, val, expire) {
	var days = expire * 24 * 60 * 60;
	res.cookie(name, val, {
		expires: new Date(Date.now() + days),
    httpOnly: true 
	});
};

 function delCookie(res, name) {
 	   res.clearCookie(name);
 };

 function getCookie(req, key) {
 	if (typeof req.cookies[key] !== 'undefined') {
 		    return req.cookies[key];
 	}
 	      return null;
 };

//生成jsError日志
var str = [];
router.post('/log.html',function(req,res,next){
      //var fileFs = require('../public/script/fileFs.js');        
      //res.json({code: 200, result:req.body});  //返回JSON数据
      
      //创建目录
      // fs.mkdir('./public/log',0777,function(err){
      //      console.log('创建目录');
      // })  //异步

      var cwd = process.cwd();   //当前的路径

      if(!fs.existsSync('./public/log')){
          fs.mkdirSync('./public/log',0777);
      };     
     
      //写入、添加文件
      str.push(req.body);
      fs.writeFile('./public/log/log.txt', JSON.stringify(str),function(err){
            if (err) throw err;
            str.push(req.body);
            console.log('写入文件成功：'+new Date().getTime());         
      });

});

//监听文件是否变化 
fs.watchFile('./public/log/log.txt',function(curr, prev){
     console.log('监听文件前一个状态: ' + prev.mtime);     
     console.log('监听文件现在状态: ' + curr.mtime);    
});


//首页
router.get(['/','/index.html'], function(req, res, next) {
       if(req.session.name){
          return res.redirect('/warn.html');
       }else{
          index.router(req, res, next);
       }
     
});


//警告页面
router.get('/warn.html', function(req, res, next) {
     if(req.session.name){
         warn.router(req, res, next);        
     }else{
         return res.redirect('/index.html');
     }     
});


//监控页面
router.get('/monitor.html', function(req, res, next) {
     if(req.session.name){
         monitor.router(req, res, next);
     }else{
         return res.redirect('/index.html');
     }     
});

router.post('/monitor', function(req, res, next) {
     if(req.session.name){
         monitor.getPage(req, res, next);
     }else{
         return res.redirect('/index.html');
     }     
});


//报告页面
router.get('/report.html', function(req, res, next) {
     if(req.session.name){
         report.router(req, res, next);
     }else{
         return res.redirect('/index.html');
     }     
});


//配置页面
router.get('/config.html', function(req, res, next) {
     if(req.session.name){
         config.router(req, res, next);
     }else{
         return res.redirect('/index.html');
     }     
});

//系统页面
router.get('/system.html', function(req, res, next) {
     if(req.session.name){
         system.router(req, res, next);
     }else{
         return res.redirect('/index.html');
     }     
});


//简介
router.get('/brief.html', function(req, res, next) {
     if(req.session.name){
          brief.router(req, res, next);
     }else{
         return res.redirect('/index.html');
     }

});

//登录
router.post('/login', function(req, res){
	    var user = {
	      name: req.body.name,
	      password: req.body.password,
        isSetCookie:req.body.isSetCookie  	
	    };
		UsersModels.findOne({name:user.name,password:user.password},function(err,doc){
            if(!!doc){
                  req.session.name = user.name; 
                  req.session.userId = doc._id;
                  res.json({code: 200, result:1});
                  req.session.error = '登陆成功';
                  console.log(user.name + ": 登陆成功 " + new Date());                  
            }else{ 
                  req.session.error = '用户名或密码不正确'; 
                  res.json({code: 200, result:0});
                  console.log(user.name + ": 登陆失败" + new Date());  
            } 
		})		
});

//退出
router.get('/logout.html',function(req,res,next){
     req.session.error = '';
     req.session.name = '';
     req.session.userId = '';     
     //req.session.destory();
     return res.redirect('/index.html'); 
});

//注册页面
router.get('/users.html', function(req, res, next) {
     users.router(req, res, next);
});

//修改数据
router.get('/users/update/:id', function(req, res, next) {
       users.modify(req, res, next);
});

//更新数据
router.post('/users/update', function(req, res, next) {
       users.update(req, res, next);
});

//保存数据
router.post('/users/add', function(req, res, next) {
       users.add(req, res, next);
});

//删除数据
router.get('/users/delete/:id', function(req, res, next) {
	   users.delete(req, res, next);
});

module.exports = router;