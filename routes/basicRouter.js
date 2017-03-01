var express = require("express");
var basicRouter = express.Router();
//跳转到首页
basicRouter.get("/toIndex",function(req,resp){
	resp.render("test",{
		title:"this is first jade",
		author:"xuhan",
		content:"这个是node中的jade"
	},function(err,html){
		if(!err){
			resp.send(html);
		}else{
			console.log("渲染失败");
			console.log(err);
		}
	})
});

module.exports = basicRouter;