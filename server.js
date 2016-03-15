var riffle = require('jsriffle');

var server = riffle.Domain(process.env.Domain);
var app = server.linkDomain('xs.demo.nickh.chat');

server.onJoin = function() {
  app.subscribe('exisChat', function(msg){
    console.log(Date.now().toLocaleString() + "[" + msg.username + "]: " + msg.msg);
  });
}

server.join();
