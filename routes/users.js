var UsersModels = require('../models/users'); //数据操作对象
module.exports = {
    router: function(req, res, next){
		UsersModels.find(function(err, user) {
			if (err) {
				console.log(err);
			}
			res.render('users', {
				title: '欢迎客官大人',
				user: user,
				oneUser: false
			})
		})    
    },
    modify:function(req, res, next){
		var id = req.params.id;
		if (id) {
			//查找指定要修改的数据
			UsersModels.findOne({_id: id},function(err,user){
				res.render('users', {
					 title : '修改账户操作',
					 oneUser : user,
					 user : user
				})
			})
		}    	
    },
   update:function(req, res, next){
		var oneUser = req.body.oneUser;
		if (!oneUser) {
			return
		}
		UsersModels.update({_id: oneUser._id}, {
			$set: {
				name: oneUser.name,
				password:oneUser.password
			}
		}, function(err) {
			if(err){
				console.log(err)
				return
			}
			console.log('更新成功')
			return res.redirect('/users.html');
		});   	
   },
   add:function(req, res, next){
		var user = req.body.user;
		if (!user) {
			console.log(user)
			return;
		}
		var user = new UsersModels(user);
			//保存数据
		user.save(function(err) {
			if (err) {
				console.log('保存失败')
			}
			console.log('数据保存成功')
			return res.redirect('/users.html')
		});   	
	},
	delete:function(req, res, next){
		var id = req.params.id;
		if (id) {
			UsersModels.remove({
				_id: id
			}, function(err) {
				if (err) {
					console.log(err)
					return
				}
				console.log('删除成功')
				return res.redirect('/users.html')
			});
		}		
	} 
};


