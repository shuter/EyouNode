/**
 * Created by JetBrains WebStorm.
 * User: danhuang
 * Date: 12-3-13
 * Time: 下午10:32
 * To change this template use File | Settings | File Templates.
 */
var mysql   = require('mysql');
var db      = mysql.createConnection({
    host     : C.dbconfig['host'],
    port     : C.dbconfig['port'],
    user     : C.dbconfig['user'],
    password : C.dbconfig['password'],
    database : C.dbconfig['dbname']
});

db.connect();
/*
 *基本操作函数，插入数据库
 * 变量：values需要插入的数据string，tableName需要插入的表名
 * 返回插入成功返回插入id值，插入失败返回false
 */
var DB = {  

    add : function(values,callBack){
        var addMsg = changeJsonToString(values);
        db.query('INSERT INTO ' + this._table + "(" + addMsg["key"] +") values(" + addMsg["value"] +")",
            function(error, results) {
                if(error) {
                    db.end();
                    callBack(0);
                    return false;
                }
                callBack(results.insertId);
            });
    },

    /*
     *更新数据库记录
     * 变量：key需要更新的主键值，values需要更新的数组json格式，需要更新的表名
     * 返回：更新成功返回true，更新失败返回false
     */
    update : function(key,values,callBack){
        var jsonString = changeJsonToUpdateData(values);
        console.log('update ' + this._table +" set " + jsonString +" where " + this._key + " = " +key);
        db.query('update ' + this._table +" set " + jsonString +" where " + this._key + " = " +key,
            function(error, results) {
                if(error) {
                    console.log("dbReady Error: " + error.message);
                    db.end();
                    callBack(false);
                }
                console.log('Inserted: ' + results.affectedRows + ' row.');
                console.log('Id inserted: ' + results.insertId);
                callBack(true);
            });
    },

    /*
     *删除数据库一个数据
     * 变量：key主键值，tableName需要操作的表名
     * 返回：删除成功返回true，失败返回false
     */
    deleteItem : function(key,callBack){
        db.query('delete from' + this._table +" where " + this._key + " = " +key,
            function(error, results) {
                if(error) {
                    console.log("dbReady Error: " + error.message);
                    db.end();
                    callBack(false);
                }
                console.log('Inserted: ' + results.affectedRows + ' row.');
                callBack(true);
            });
    },

    /*
     *获取表单所有数据
     * 变量：tableName需要操作的表名
     * 返回：成功返回数组，失败返回false
     */
    select : function(sql,callBack){    
        db.query(sql,
            function(error, rows, fields) {
                if (error) {
                    console.log('GetData Error: ' + error.message);
                    db.end();
                    return false;
                }
                callBack(rows);
            });
    },

    /*
     *查询数据
     * 变量：tableName需要操作的表名
     * 返回：成功返回数组，失败返回false
     */
    query : function(sql){
        selectFields = selectFields ? selectFields:"*";
        db.query('SELECT ' + selectFields + ' FROM ' + this._table + ' where ' + where,
            function selectCb(error, results) {
                if (error) {
                    console.log('GetData Error: ' + error.message);
                    db.end();
                    callBack(false);
                }
                callBack(results);
            });
    },

}


//将json转化为string类型
function changeJsonToString(json){
    var jsonKey = [],
        jsonValue = [];
    for(var item in json){
        jsonKey.push(item);
        jsonValue.push("'"+json[item]+"'");
    }
    jsonKey.join(",");
    jsonValue.join(",");
    return {"key":jsonKey,"value":jsonValue};
}

function changeJsonToUpdateData(json){
    var myJson = [];
    for(var item in json){
        myJson.push(item+"='" + json[item] +"'");
    }
    return   myJson.join(",");
}

module.exports = DB;