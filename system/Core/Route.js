var route = module.exports = {};

route.init=function(app)
{
	//文件
	var fs = require('fs');
	 
	//默认连接 
	app.get('/',function(req,res,next){
		C.g=(C.default_directory=='')?'':C.default_directory + '/';
		C.m=C.default_controller,
		C.a='index';
		require(C.controller+C.g + C.m)['init'](req,res,next,'index');
	});

	//路由
	app.get('/*',function(req,res,next){
		var path = req.params[0],URI = path.split('/');
		var d = '';	//文件夹分组 dir
		var c = '';	//控制器    controller
		var a = ''; //调用方法   action
		var p = ''; //传入参数   params
		
		fs.exists(C.controller + URI[0],function(dir_exists){
			if(dir_exists == true){
				var firstURI = (URI.length>1)?URI.shift():URI[0];
				d = firstURI+'/';
				c = firstURI;
			}
			fs.exists(C.controller + d + URI[0] + '.js',function(file_exists){
				if(file_exists == true){
					var firstURI = URI[0];
					c = firstURI;
					a = 'index';
				}
					
				switch(URI.length){
					case 0: 			// example: /controller
						a = 'index';
						break;
					case 1:
						var is_params = URI[0].indexOf('.html');
						if(is_params < 0){				// example: /action
							if(c==''){
								d = C.default_directory+'/';
								c = C.default_controller;
							}
							a = (a=='')?URI[0]:a;
						}else{							// example: /params.html
							var params = URI[0].split('.');
							d = C.default_directory+'/';
							c = C.default_controller;
							a = 'index';
							p = params[0];
						}
						break;
					case 2:
						var is_params = URI[1].indexOf('.html');
						if(is_params < 0){				// example: /controller/action
							c = URI[0];
							a = URI[1];
							p = URI[1];
						}else{							// example: /controller/params.html
							var params = URI[1].split('.');
							c = URI[0];
							a = 'index';
							p = params[0];
						}
						break;
					case 3:
						var is_params = URI[2].indexOf('.html');
						if(is_params < 0){				// example: /controller/method/params
							c = URI[0];
							a = URI[1];
							p = URI[2];
						}else{							// example: /controller/method/params.html
							var params = URI[2].split('.');
							c = URI[0];
							a = URI[1];
							p = params[0];
						}
						break;
					default:
						c = URI.shift();
						a = URI.shift();
						//p = URI;
						break;
				}
				req.params = p.split('-');
				console.log('d='+d+'/c='+c+'/a='+a);
				var REQUIRE_URI = C.controller+d+c; 
				fs.exists(REQUIRE_URI+'.js',function(req_exists){
					if(req_exists == true){	//路由加载
						console.log('success:uri=controllers/'+d+c+'|'+a);
						require(REQUIRE_URI)['init'](req,res,next,a);
					}else{					//404
						console.log('error404:uri=controllers/'+d+c+'|'+a);
						return res.render(C.view+'/error.html', {message: '404'});
					}
				});
			});

		});
		
	});
	
	//无参数传递
	app.all('/:group/:module/:action',function(req,res,next){
		var g=req.params.group,m=req.params.module,a = req.params.action;C.g=g;C.m=m,C.a=a;
		//console.log(g+'/'+m+'/'+a);
		require(C.controller+'/'+g+'/'+m)['init'](req,res,next,a);
	});
	
	//有参数传递 如 id/1/name/ken
	app.all('/:group/:module/:action/*',function(req,res,next){
		if(req.params.group!='data'&&req.params.group!='css')
		{
			var list = req.params[0],list=list.split('/'),data = {};
			for(i=0;i<Math.ceil(list.length/2);i++)
			{
				data[list[i*2]]=list[i*2+1];
			}
	
			var g=req.params.group,m=req.params.module,a = req.params.action;
			C.g=g;C.m=m,C.a=a;
			//console.log(g+'/'+m+'/'+a);
			req.xdata = data;
			//require(C.controller+'/'+g+'/'+m)[a](req, res,next);
			require(C.controller+'/'+g+'/'+m)['init'](req,res,next,a);
		}
		else
		{
			next();
		}
	
	});
	
	
	//404
	app.get('/*',function(req,res){
		return res.render(C.view+'/error.html', {message: '404'});
	});
	
}