var mysql = require('promise-mysql');

pool = mysql.createPool({
 host: '192.168.22.2',
 user: 'root',
 password: 'root',
 database: 'dengqiqi',
 connectionLimit: 4
});

function getSqlConnection() {
 return pool.getConnection().disposer(function(connection) {
   pool.releaseConnection(connection);
 });
}

module.exports = getSqlConnection;