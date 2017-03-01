var redis = require("./redis");
var _ = require("lodash");

/**
 * 从cache中取出缓存
 * @param key 键
 * @param callback 回调函数
 */
 var get = function(key,callback){
 	redis.get(key,function(err,data){
 		if(err){
 			return callback(err);
 		}
 		if(!data){
 			return callback();
 		}
 		data = JSON.parse(data);
 		callback(data);
 	});
 };

 exports.get = get;

 /**
  *将键值对数据缓存起来
  *
  */
  var set = function(key,value,time,callback){
  	if(typeof time === 'function'){
  		callback = time;
  		time = null;
  	}
  	callback = callback || _.noop;
  	value = JSON.stringify(value);
  	if(!time){
  		redis.set(key,value,callback);
  	}else{
  		//将毫秒单位转换为秒
  		redis.setex(key,parseInt(time / 1000),value,callback);
  	}
  };

  exports.set = set;