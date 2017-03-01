var express = require("express");
//创建路由中间件require
var userRouter = express.Router();
userRouter.get("/add",function(req,resp){
	resp.send("添加学生");
});
userRouter.get("/delete",function(req,resp){
	resp.send("删除学生");
});
module.express = userRouter;