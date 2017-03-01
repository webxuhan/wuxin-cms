//数据库操作对象
var DbOpt = require("../DbOpt");
//时间格式化
var moment = require("moment");
//缓存
var cache = require("../../util/cache");
//系统消息

function isLogined(req){
	return req.seesion.logined;
}

var siteFunc = {
	siteInfos: function
}
