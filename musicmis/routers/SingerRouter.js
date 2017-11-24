let router = require('koa-router')();
let singerDb = require('../db/singerDb.js');

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