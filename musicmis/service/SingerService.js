let Redis = require('ioredis');
let options = {
    host:'127.0.0.1',
    port:6379,
    password:'igeek'
}

function SingerService() {
    this.client = new Redis(options);
}

//添加一个新歌手信息，并将所有的歌手信息查询回来，返回给客户端
SingerService.prototype.addSinger = async function(singer){
    let singers = null;
    //在redis中添加新的对象时，使用对象的类型+id作为key
    await this.client.setnx('singerid', 0);//只在key不存在时设置key的值
    let newid = await this.client.incr('singerid');
    singerId = 'singer:' + newid;
    await this.client.hmset(singerId, singer);

    let keys = await this.client.keys('singer:*');
    let promises = keys.map(key => {
        return new Promise(res => {
            this.client.hgetall(key).then(function(value){
                res(value);
            });
        });
    });

    await Promise.all(promises).then(function(values){
        singers = values;
    });

    return singers;
}

module.exports = new SingerService();