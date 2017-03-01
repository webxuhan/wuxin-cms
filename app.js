// 导入第三方模块
var express = require('express');
var session = require("express-session");
var ReidsStore = require("connect-redis")(session);
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var io = require("socket.io")();//事件监听
var fs = require("fs"); //文件操作对象
// 引用自定义模块
var index = require('./routes/index');
var admin = require('./routes/admin');
var users = require('./routes/users');
var filter = require('./util/filter');

//分层路由
var adminCtrl = require("./routes/adminCtrl")

//站点配置
var settings = require("./models/db/settings");

/*实例化express对象*/
var app = express();

// view engine setup
//1.设定模板所在目录为当前app.js所在目录下的views目录中
app.set('views', path.join(__dirname, 'views'));
//2.设定模板引擎为jade
app.set('view engine', 'jade');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
//请求体解析器
app.use(bodyParser.json({limit:"50mb"})); //限制上传5M
app.use(bodyParser.urlencoded({ extended: false ,limit:"50mb"}));
//cookie解析器
// app.use(cookieParser());
app.use(cookieParser(settings.session_secret));
//解决异步层次混乱问题
app.use(require("express-promise")());

app.use(session({
	secret: settings.session_secret,
	store: new ReidsStore({
		port: settings.redis_port,
		host: settings.redis_host,
		pass: settings.redis_psd,
		ttl: 1800 //过期时间
	}),
	resave: true,
	saveUninitialized: true
}));

app.use(filter.authUser);

app.use(function(req,res,next){
	//针对注册会员
	res.locals.logined = req.session.logined;
	res.locals.userInfo = req.session.user;
	//针对管理员
	res.locals.adminlogined = req.session.adminlogined;
	res.locals.adminlogined = req.session.adminUserInfo;
	res.locals.adminNotices = req.session.adminNotices;
	//指定站点域名
	res.locals.myDomain = req.headers.host;
	next();
});


//静态服务器
app.use(express.static(path.join(__dirname, 'public')));


/*指定路由控制*/
// app.use('/', index);
// app.use('/users', users);
app.use('/admin',adminCtrl);
app.use('/admin',admin);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
