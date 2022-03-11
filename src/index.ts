import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';

export const APP = new Koa();
const router: any = new Router();
import cors from 'koa2-cors';
import tls from 'tls';


// 【error: ssl_choose_client_version:unsupported protocol】https://github.com/nodejs/help/issues/1936
tls.DEFAULT_MIN_VERSION = 'TLSv1';

// 挂载日志模块
// app.use(async (ctx, next) => {
//   ctx.log = require('./utils/log').
//   await next()
// })

APP.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    // 和云api统一，错误请求不修改status code, 一律返回200
    // ctx.response.status = err.statusCode || err.status || 500;
    ctx.body = {
      err: err.message
    };
    // 释放error事件
    ctx.app.emit('error', err, ctx);
  }
});

// 继续触发error事件
APP.on('error', (err) => {
  console.error('server error', err.message);
});

// 路由
// AppRoutes.forEach(route => router[route.method](route.path, route.action));

APP.use(bodyParser());
APP.use(cors({
  credentials: true,
}));



APP.use(async ctx => {
  ctx.body = 'Hello World';
});

APP.use(router.allowedMethods());



APP.listen(3000);


console.log('应用启动成功 端口:3000');
