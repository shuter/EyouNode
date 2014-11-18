/**********************************************************
以下为使用者文件目录设置，请做好相关设置，若无需自定义请保持默认
***********************************************************/

global.ROOT_DIR   = global.WWWROOT + "/../../../";
global.COMMON	  = global.ROOT_DIR + "common/";
global.SYSTEM	  = global.ROOT_DIR + "system/";
global.APP        = global.WWWROOT + "/../";
global.CONFIG     = global.APP + "config/";
global.MODEL      = global.APP + "models/";
global.VIEW       = global.APP + "views/";
global.STATIC     = global.WWWROOT + "/static"
global.CONTROLLER = global.APP + "controllers/";
global.DATA       = global.APP + "data/";
global.LOG        = global.DATA + "log/";

//==================== 加载框架核心程序 =================//

EyouNode = require(global.ROOT_DIR + "system/EyouNode");