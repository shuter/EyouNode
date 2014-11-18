var Controller = {

	init : function(req,res,next,a){
		var _S = this;
  		if('function'!==typeof _S[a])next();
    	_S[a](req,res,next);
	}
}

module.exports = Controller;