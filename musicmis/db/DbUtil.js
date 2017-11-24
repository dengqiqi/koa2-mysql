var mysql = require('promise-mysql');
var Promise = require("bluebird");

pool = mysql.createPool({
    host: '192.168.22.2',
    user: 'root',
    password: 'root',
    database: 'dengqiqi',
    connectionLimit: 4
});

function getSqlConnection() {
    return pool.getConnection().disposer(function (connection) {
        pool.releaseConnection(connection);
    });
}

async function execSql(sql) {
    let result = null;
    await Promise.using(getSqlConnection(), function (connection) {
            return connection.query(sql)
                .then(function (rows) {
                    return rows; //rows是数据库执行sql操作的结果
                }).catch(function (error) {
                    console.log(error);
                });
        })
        .then(function (rows) {
            result = rows;
        });
    return result;
}

module.exports = execSql;