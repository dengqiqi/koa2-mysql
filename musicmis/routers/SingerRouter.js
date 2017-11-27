let router = require('koa-router')();
const fs = require('fs');
const multy = require('multy');
const nanoid = require('nanoid');
let singerDb = require('../db/singerDb.js');

router.use(multy());
router.prefix('/singer');

router.get('/', async function(ctx, next) {
    let singers = await singerDb.querySinger();//查询全部歌手
	
	await ctx.render('singer',{
		singers
	});
});

router.post('/add', async function(ctx, next) {
    let singer = ctx.request.body;
    //调用业务对象完成歌手信息的保存
    //将歌手中的图片文件保存在yy/mm/dd/uuid.jpg中
    let name = singer.picName.name;
    let posifix = name.substring(name.indexOf('.'));
    //使用uuid生成一个新的文件名称
    name = nanoid() + posifix;
    
    const stream = fs.createWriteStream(__dirname + '/../public/singerImgs/' + name);
    singer.picName.pipe(stream);

    //将名称和其他数据保存在数据库中
    singer.picName = name;
    let singers1 = await singerDb.addSinger(singer);
    let singers = await singerDb.querySinger();

    await ctx.render('singer', {
        singers
    });
});

router.get('/del/:id', async function(ctx, next) {
    let id = ctx.params.id;

    let rs = await singerDb.delSinger(id);
	
	await ctx.render('delrs',{
		rs
	});
});

router.get('/edit/:id', async function(ctx, next) {
    let id = ctx.params.id;

    let singer = await singerDb.querySingerById(id);
	
	await ctx.render('updateSinger',{
		singer
	});
});

router.post('/edit', async function(ctx, next) {
    let singer = ctx.request.body;

    let ra = await singerDb.updateSinger(singer);
	
	await ctx.render('delrs',{
		ra
	});
});

module.exports = router;