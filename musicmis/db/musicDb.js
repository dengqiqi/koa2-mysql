var execSql = require('./DbUtil.js');

function MusicDb(){

}

MusicDb.prototype = {
    constructor: MusicDb,
    saveMusic: function(music){
        let sql = `insert into music(title,singerid,time,lrc,audio,pic)
        values('${music.title}','${music.singerid}','${music.time}','${music.lrc}','${music.audio}','${music.pic}')`;
        return execSql(sql);
    }

};

module.exports = new MusicDb();