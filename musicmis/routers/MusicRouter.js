let router = require('koa-router')();
const multy = require('multy');
const nanoid = require('nanoid');
const fs = require('fs');

const musicDb = require('../db/musicDb.js');
const singerDb = require('../db/SingerDb.js');

router.prefix('/music');
router.use(multy());

router.get('/',async function(ctx,next){
    let singers = await singerDb.querySinger();
    await ctx.render('music',{
        singers
    });
});

router.post('/add', async function(ctx,next){
    let music = ctx.request.body;
    //将文件生成唯一文件名并写入相应目录
    let pic = generateUUIdFileName(music.picfile.name);
    let lrc = generateUUIdFileName(music.lrcfile.name);
    let audio = generateUUIdFileName(music.audiofile.name);
    saveFile(music.picfile, 'musicpics', pic);
    saveFile(music.lrcfile, 'musiclrcs', lrc);
    saveFile(music.audiofile, 'musicaudios', audio);
    //将新生成的文件名存入数据库
    music.pic = pic;
    music.lrc = lrc;
    music.audio = audio;
    let delrs = await musicDb.saveMusic(music);
    await ctx.render('delrs', {
        delrs
    });
});

module.exports = router;

//获得唯一文件名
function generateUUIdFileName(src){
    let target = null;
    let ext = src.substring(src.indexOf('.'));
    target = nanoid() + ext;

    return target;
}

//写入文件
function saveFile(readStream, subDir, name){
    const stream = fs.createWriteStream(__dirname + '/../public/' + subDir + '/' + name);
    readStream.pipe(stream);
}