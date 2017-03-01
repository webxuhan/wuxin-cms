//管理员对象

var mongoose = require("mongoose");
var shortid = require("shortid");
var Schema = mongoose.Schema;

var AdminGroup  = require("./AdminGroup");

var AdminUserSchema = new Schema({
	_id: {
		type: String,
		unique: true,
		'default': shortid.generate
	},
	name: String,
	userName: String,
	password: String,
	email: String,
	phoneNum: String,
	comments: String,
	date: { type: Date, default: Date.now },
	logo: { type: String },
	auth: { type: Boolean, default: false},
	group: {
		type: String,
		ref: 'AdminGroup'
	}
});

AdminUserSchema.statics = {
	getOneItem: function(res,targetId,callBack){
		AdminUser.findOne({'_id':targetId}).populate('group').exec(function(err,user){
			if(err){
				res.end(err);
				console.log(err);
			}
			callBack(user);
		})
	}
};

var AdminUser = mongoose.model("AdminUser",AdminUserSchema);

module.exports = AdminUser;