//后台相关操作

var url = require("url");
var settings = require("./settings");
//数据库操作对象
var DbOpt = require("../DbOpt");

//管理员对象
var AdminUser = require("../AdminUser");
//管理员用户组对象
var AdminGroup = require("../AdminGroup");

/*此处加载对象*/

//数据校验
var validator = require("validator");
var system = require("../../util/system");
var request = require("request");
var adminFunc = {
	
}