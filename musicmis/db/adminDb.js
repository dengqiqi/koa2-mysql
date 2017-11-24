var execSql = require('./DbUtil.js');

function adminDb(){

}

adminDb.prototype.queryadmin = function(){
    let sql = 'select * from admin';
    return execSql(sql);
}

adminDb.prototype.addadmin = function(admin){
    let sql = `insert into admin (adminName,adminPwd) values ('${admin.adminName}','${admin.adminPwd}')`;
    return execSql(sql).then(function(r){
        console.log(r);
    });
}

adminDb.prototype.deladmin = function(id){
    let sql = `delete from admin where id = ${id}`;
    return execSql(sql);
}

adminDb.prototype.queryadminById = function(id){
    let sql = `select * from admin where id = ${id}`;
    return execSql(sql);
}

adminDb.prototype.updateadmin = function(admin){
    let sql = `update admin set name = '${admin.name}' where id = ${admin.id}`;
    return execSql(sql);
}

adminDb.prototype.validateLogin = function(admin){
    let sql = `select id,adminName from admin where adminName = '${admin.adminName}' and adminPwd = '${admin.adminPwd}'`;
    return execSql(sql);
}

module.exports = new adminDb();