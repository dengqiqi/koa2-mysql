let koa = require('koa');
let session = require('koa-session');
let bodyparser = require('koa-bodyparser');
let views = require('koa-views');
let serve = require('koa-static');

let singerRouter = require('./routers/SingerRouter.js');
let musicRouter = require('./routers/musicRouter.js');
let indexRouter = require('./routers/indexRouter.js');
let AdminRouter = require('./routers/AdminRouter.js')

let app = new koa();

//按照顺序配置中间件,router中间件应该最后配置

app.keys = ['some secret hurr'];

const CONFIG = {
    key: 'koa:sess',
    maxAge: 86400000
    // overwrite: true,
    /** (boolean) can overwrite or not (default true) */
    // httpOnly: true,
    /** (boolean) httpOnly or not (default true) */
    // signed: true,
    /** (boolean) signed or not (default true) */
    // rolling: false,
    /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. default is false **/
};
app.use(session(CONFIG,app));

app.use(serve(__dirname + '/public'));
//添加post请求参数解析器
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}));

//配置模板解析器
app.use(views(__dirname + '/views', {
    map: {
        html: 'swig'
    }
}));

//配置登录检查中间件
app.use(async (ctx, next) => {
    if (ctx.session.admin || (ctx.path === '/' || ctx.path === '/admin/login')) {
        await next();
    } else {
        await ctx.render('login');
    }
})

//配置路由
app.use(singerRouter.routes());
app.use(musicRouter.routes());
app.use(indexRouter.routes());
app.use(AdminRouter.routes());

app.listen(3000);