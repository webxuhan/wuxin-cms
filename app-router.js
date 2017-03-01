var express = require("express");
var userRouter = require("./routers/userRouter");
var app = express();
//静态服务器中间件
app.use(express.static("public"));


app.use("/user",userRouter);

app.listen("2222",function(){
	console.log("端口号为2222的服务器开启");
});

var buff = new Buffer(0);
req.on("data",function(data){
	buff += data;
});
req.on("end",function(){
	buff.toString();
})