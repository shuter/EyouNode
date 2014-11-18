var EyouNode = {
    init: function (root) {

        this.core   = __dirname + '/Core'
        this.action = __dirname + '/action';
        this.lib    = __dirname + '/Libraries';
        this.conf   = ROOT_DIR  + '/config';

        this.root = root;
        this.config();
        this.app = this.express();
        this.route();
        this.mongodb();
        this.io();
        //this.run();
        this.http();


    },
    /**
     * 获取网站配置
     * @returns {*|Function|reserved.init}
     */
    config: function () {
        return global.C = require(this.root + "config/config").init(this.root);
    },
    /**
     * 初始化express 暴露app到全局
     * @returns {*|Function|reserved.init}
     */
    express: function () {
        var app = require(this.core + "/Express").init();
        return app;

    },
    /**
     * 路由定义
     * @returns {*|Function|reserved.init}
     */
    route: function () {
        var route = require(this.core + "/Route").init(this.app);
        return route;
    },
    /**
     * 建立链接DB 初始化 mongodb 的model层
     * @returns {*|Function|reserved.init}
     */
    mongodb: function () {
        var MongoDb = require(this.lib + "/mongodbConnect").init(this.app);
        global.D = require(this.lib + '/db');
        return MongoDb;
    },
    /**
     * 创建socket.io
     * @returns {*|Function|reserved.init}
     */
    io: function () {
        global.io  = require('socket.io').listen(this.app);
        return io;
    },
    /**
     * 创建HTTP端口
     * @returns {*|SimpleServer.listen|http.Server}
     */
    http: function () {
        var http = require('http').createServer(this.app).listen(C.port, function () {});
        return http;
    }

}

global.App = {
    /**
     * 建立链接DB 初始化 mysql 的model层
     * @returns {*|Function|reserved.init}
     */
    db: function () {
        global.DB = require(C.lib + '/mysql');
        return global.DB;
    }
}

module.exports = App;
module.exports = EyouNode;