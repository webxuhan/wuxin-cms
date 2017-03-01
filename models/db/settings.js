/*
	创建数据库连接
	该模块只会被加载一次
*/
module.exports = {
	//debug为ture时，用于本地调试
	debug: true,
	imgZip: false,//上传图片是否压缩(如果为false则本地不需要安装gm)
	session_secret:"wuxincms_secret",//务必修改
	auth_cookie_name:"wuxincms",
	encrypt_key:"wuxin",
//数据库配置
	URL:"mongodb://127.0.0.1:27017/wuxincms",
	DB:"wuxincms",
	HOST:"",
	PORT: 27017,
	USERNAME:"",
	PASSWORD:"",

//站点基础信息配置
	SITETITLE : '前端精英大队', //站点名称


	SYSTEMMANAGE : ['sysTemManage','WuxinCMS后台管理'],  //后台模块(系统管理)
// 本地缓存设置
	redis_host:"127.0.0.1",
	redis_port:6379,
	redis_psd: "",
	redis_db: 0,

// 邮箱相关设置

// 信息提示相关
	system_illegal_param: "非法参数",
	system_noPower: "对不起，您无权执行该操作！"
}