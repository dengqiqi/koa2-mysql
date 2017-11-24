var execSql = require('./DbUtil.js');

function SingerDb(){

}

SingerDb.prototype.querySinger = function(){
    let sql = 'select * from singer';
    return execSql(sql);
}

SingerDb.prototype.addSinger = function(singer){
    let sql = `insert into singer (name,englishname,guoji,chushengdi,job) values ('${singer.name}','${singer.englishName}','${singer.guoji}','${singer.chushengdi}','${singer.job}')`;
    return execSql(sql).then(function(r){
        console.log(r);
    });
}

SingerDb.prototype.delSinger = function(id){
    let sql = `delete from singer where id = ${id}`;
    return execSql(sql);
}

SingerDb.prototype.querySingerById = function(id){
    let sql = `select * from singer where id = ${id}`;
    return execSql(sql);
}

SingerDb.prototype.updateSinger = function(singer){
    let sql = `update singer set name = '${singer.name}' where id = ${singer.id}`;
    return execSql(sql);
}

module.exports = new SingerDb();