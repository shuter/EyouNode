//开始
var Action  = require(C.core+'Controller');

Action.index = function(req,res){

	//App.db();
	//var user = DB.select("select * from admin_user");
	//console.log(user);

	res.render(C.view+'/error.html', {message: "404"});

	
}

Action.file = function(req,res) {
	// body...
	fs = require('fs');
	fs.exists(APP + 'controllers/blog/base.js',function(exists){
		if(exists == true){
			res.end('exists');
		}else{
			res.end('not exists');
		}

	})
}

Action.mysql = function(req,res) {
	var mysql   = require('mysql');
	var db 	    = mysql.createConnection({
	  host     : 'localhost',
	  port	   : 3306,
	  user     : 'root',
	  password : '123456',
	  database : 'blog'
	});

	db.connect();

	db.query('select * from admin_user', function(err, rows, fields) {
	  if (err) throw err;

	  console.log('The solution is: ', rows[0].username);
	});

	db.end(); 
	res.end('mysql');
}

Action.num = function(req,res){
	timer = setInterval( function(){res.end('1');} , 5000);
}

module.exports = Action;