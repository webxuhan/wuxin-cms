var express = require("express");
var methodOverride = require("method-override");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static("public"));
//通过在查询字符串中指定的_method值为put,delete的方式来模拟delete请求,put请求
app.use(methodOverride("_method"));
app.use(methodOverride(function(req,resp){
	if(req.body && typeof req.body === 'object' && '_method' in req.body){
		var method = req.body._method
		delete req.body._method
		console.log(method);
		return method
	}
}));
app.use(cookieParser());

app.post("/login",function(req,resp){
	console.log(req.cookies);
	resp.send("post -/login");
})

app.listen("8888",function(){
	console.log("端口号为8888的服务器启动成功");
})