//网站配置文件，应用中使用全局变量 C 获取conf中的内容
var config = module.exports = {};

config.init = function(path)
{ 
	var date = new Date();
	var root = ROOT_DIR;
	var app  = path;
	var conf = {

		debug	  : true,
		port 	  : PORT,
		email 	  : 'caoyeshu@qq.com',
		site_name :'EasyNode框架',
		site_desc :'研究Node.js的开发',

		//App route
		default_directory  : 'blog',	//默认文件夹
		default_controller : 'list',	//默认控制器文件 

		session_secret :'nodeSecret',
	    secret 	  :'nodeSecret',
		//Mongodb :'mongodb://ken:ck666666@a.okmine.com:27017/todo_dev',
		Mongodb :'mongodb://112.124.64.160:27017/sns',
		staticUrl :'s0.node.cc',
		surl :'',//css images js url
		//purl :'http://'+staticUrl,//data images url
		purl :'',//data images url
	    maxAge: 259200000,
		version:'version beta 0.5.82.2013.6.6',


		//Mysql数据库配置文件
		dbconfig: {
			"host" : "localhost",
			"port" : "3306",
			"user" : "root",
			"password" : "123456",
			"dbname"   : "blog"
		},
		
		//path 相关全局变量在bootstrap中设置
		root 	: ROOT_DIR,
		core 	: SYSTEM+'Core/',
		lib		: SYSTEM+'Libraries/',
		app  	: APP,
		static 	: STATIC, 
		common	: COMMON,
		view	: VIEW+'default',
		model 	: MODEL,
		action 	: APP+'/action',
		controller:CONTROLLER,
		//global function
		time 	: function(){return Math.round(date.getTime()/1000)},
		now 	: Math.round(date.getTime()/1000)
	
	}
	
	return conf;
} 