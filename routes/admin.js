var express = require("express");
var router = express.Router();
router.caseSensitive = true; //区分大小写
var url = require("url");

//管理员对象
var AdminUser = require("../models/AdminUser");
//管理员用户组对象
var AdminGroup = require("../models/AdminGroup");
/*
数据库表对象
*/
//数据校验
var validator = require("validator");
//短id
var shortid = require("shortid");
//系统操作
var system = require("../util/system");
//系统缓存
var cache = require("../util/cache");
//站点配置
var settings = require("../models/db/settings");
var adminFunc = require("../models/db/adminFunc");
//加密类

//数据库操作对象
var DbOpt = require("../models/DbOpt");


//文件操作
var fs = require("fs");
var http = require("http");
var request = require("request");
/*GET home page.*/

var PW = require("png-word"); //创建验证码png
var RW = require("../util/randomWord");
var rw = RW("abcdefghijklmnopqrstuvwxyz1234567890");
var pngword = new PW(PW.GRAY);

//跳转到首页--测试
/*
router.get("/admin",function(req,resp){
	resp.render("adminLogin",{
		title:"WuxinCMS后台管理系统",
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
*/
//管理员登录页面
router.get("/",function(req,res){
	console.log("1110:",req.session.vnum);
	req.session.vnum = rw.random(4);
	console.log("000:",rw.random(4));
	console.log("1111:",req.session.vnum);
	res.render("manage/adminLogin",{title:settings.SITETITLE,description:"WuxinCMS后台管理系统"});
});

//刷新验证码
router.get("/vnum",function(req,res){
	console.log("1112:",req.session.vnum);
	var word = req.session.vnum;
	console.log("word:",word);
	pngword.createPNG(word,function(word){
		res.end(word);
	})
});

//管理员登录提交请求
router.post("/doLogin",function(req,res){
	var userName = req.body.userName;
	var password = req.body.passWord;
	var vnum = req.body.vnum;
	var newPsd = DbOpt.encrypt(password,settings.encrypt_key);
	//登录判断
	if(vnum != req.session.vnum){
		req.session.vnum = rw.random(4);
		res.end("验证码有误！");
	}else{
		if(validator.isUserName(userName) && validator.isPsd(password)){
			// 数据库查找
			AdminUser.findOne({'userName':userName,'password':newPsd}).populate('group').exec(function(err,user){
				if(err){
					res.end(err);
				}
				if(user){
					req.session.adminPower = user.group.power;
					req.session.adminlogined = true;
					req.session.AdminUserInfo = user;
					/*
					//获取管理员通知信息
					adminFunc.getAdminNotices(req,res,function(noticeObj){
						req.session.adminNotices = noticeObj;
						//存入操作日志
						SystemOptionLog.addUserLoginLogs(req,res,adminFunc.getClienIp(req));
						res.end("success");					
					});
					*/
					res.end("success");
				}else{
					console.log("登录失败");
					res.end("用户名或密码错误");
				}
			});
		}else{
			res.end(settings.system_illegal_param);
		}
	}
});

//管理员退出
router.get("/logout",function(req,res){
	req.session.adminlogined = fasle;
	req.session.adminPower = "";
	req.session.AdminUserInfo = "";
	res.redirect("/admin");
});

//--------------后台模块访问入口开始-----------

//管理主界面
router.get("/manage",function(req,res){
	res.render("manage/main",adminFunc.setPageInfo(req,res,settings.SYSTEMMANAGE));
});

//获取系统首页数据集合
router.get('/manage/getMainInfo',function(req,res){
	adminFunc.setMainInfo(req,res);
});

/*此处添加后台模块*/

//-----------------后台模块访问入口结束---------------------

module.exports = router;
