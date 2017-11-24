let router = require('koa-router')();
let adminDb = require('../db/adminDb.js');

router.prefix('/admin');

router.get('/', async function(ctx, next) {
    let admins = await adminDb.queryadmin();//查询全部歌手
	
	await ctx.render('admin',{
		admins
	});
});

router.post('/add', async function(ctx, next) {
    let admin = ctx.request.body;
    //调用业务对象完成歌手信息的保存
    let admins1 = await adminDb.addadmin(admin);
    let admins = await adminDb.queryadmin();

    await ctx.render('admin', {
        admins
    });
});

router.get('/del/:id', async function(ctx, next) {
    let id = ctx.params.id;

    let rs = await adminDb.deladmin(id);
	
	await ctx.render('delrs',{
		rs
	});
});

router.get('/edit/:id', async function(ctx, next) {
    let id = ctx.params.id;

    let admin = await adminDb.queryadminById(id);
	
	await ctx.render('updateadmin',{
		admin
	});
});

router.post('/edit', async function(ctx, next) {
    let admin = ctx.request.body;

    let ra = await adminDb.updateadmin(admin);
	
	await ctx.render('delrs',{
		ra
	});
});

router.post('/login', async function(ctx, next) {
    let admin = ctx.request.body;
    let loginAdmin = await adminDb.validateLogin(admin);

	if(loginAdmin[0]){
        ctx.session.admin = loginAdmin[0];
        await ctx.render('index',{
            admin
        });
    }else{
        await ctx.render('login',{error:'登录失败!'});
    }
});

module.exports = router;