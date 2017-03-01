var express = require("express");
var methodOverride = require("method-override");

var app = express();

app.use(express.static("public"));
//通过在查询字符串中指定的_method值为put,delete的方式来模拟delete请求,put请求
app.use(methodOverride("_method"));
app.put("/login",function(req,resp){
	resp.send("put - ok");
});
app.post("/login",function(req,resp){
	resp.send("post - ok");
});

app.listen("8888",function(){
	console.log("端口号为8888的服务器启动成功");
})