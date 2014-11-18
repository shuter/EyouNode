//========================变量定义===============================
/**
 * modules引入
 */
var Action = require(C.core+'Controller');

Action.index = function(req,res){
    /**
     * 配置socket.io
     * 
     */ 
    io.sockets.on('connection', function(socket){
        console.log("Connection " + socket.id + " accepted.");
        socket.on('message', function(message){
            console.log("Received message: " + message + " - from client " + socket.id);
        });
        socket.on('disconnect', function(){
            console.log("Connection " + socket.id + " terminated.");
        });
    });
}

module.exports = Action;