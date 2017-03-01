var express = require("express");
var expressSession = require("express-session");

var app = express();
app.use(express.static("public"));
app.use(expressSession({
	secret:'keyboard cat',
	resave:false,
	saveUninitialized:true
}));
app.get("/one",function(req,resp){
	req.session.user = {
		name:"terry",
		age:12
	};
	resp.send("将user保存到了session");
});
app.get("/two",function(req,resp){
	var user = req.session.user;
	console.log(user);
	if(user){
		resp.send(JSON.stringify(user));
	}else{
		resp.send("session中没有存储user");
	}
});
app.listen("1234",function(){
	console.log("端口号为1234的服务器开启");
})