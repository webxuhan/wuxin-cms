// 导入第三方模块
var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var cookieParser = require("cookie-parser");
var expressSession = require("express-session");
var serveStatic = require("serve-static");
//导入核心模块
var path = require("path");
// 导入自定义模块
var basicRouter = require("./routes/basicRouter");

var app = express();
//1.设定模板引擎为jade
app.set("view engine","jade");
//2.设定模板所在目录为当前app.js所在目录下的views目录中
app.set("views",path.join(__dirname,"views"));
app.use(serveStatic("public",{
	index:["index.html","default.html"]
}));
// 3.设置路由
app.use("/",basicRouter);

app.listen("8888",function(){
	console.log("端口号为8888的服务已经开启。。。");
});