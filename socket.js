var io = require('socket.io')();
var fs = require('fs');

io.on('connection', function (socket) {
    // socket.emit('news', { hello: 'world' });
    // socket.on('notifyNum', function (data) {
    //     console.log('notifyNum:'+data.msg_count);
    // });
	 fs.watchFile('./public/log/log.txt',function(curr, prev){
	 	   console.log(fs.readFileSync('./public/log/log.txt', "utf8"))
	 	   io.sockets.emit('log',{ log: fs.readFileSync('./public/log/log.txt', "utf8") || []});
	 })	
    io.sockets.emit('log',{ log: fs.readFileSync('./public/log/log.txt', "utf8") || []});
	        
});

exports.listen = function (_server) {
    return io.listen(_server);
};