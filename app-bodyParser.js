var express = require("express");
var bodyParser = require("body-parser");

var app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:false}));
app.post("/login",function(req,resp){
	console.log(req.body);
});
app.listen("1234",function(){
	console.log("端口号为1234的服务器启动成功");
});