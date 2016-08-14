var mongoose = require("mongoose");

// 连接字符串格式为mongodb://主机/数据库名
mongoose.connect('mongodb://127.0.0.1:27017/socket');

// 数据库连接后，可以对open和error事件指定监听函数。
var db = mongoose.connection;

db.on('error', console.error);

db.once('open', function() {
	console.log('连接成功')
});

var Schema = mongoose.Schema;
var userSchema = new Schema({
	name     : String,
	password : String
})

var Users = mongoose.model('users', userSchema);

//倒出模型
module.exports = Users