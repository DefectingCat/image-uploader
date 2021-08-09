import Koa from 'koa';
import logger from 'koa-logger';
import cors from '@koa/cors';
import config from './config';
import router from './routers';
import koaBody from 'koa-body';
import serve from 'koa-static';
import path from 'path';

const publicPath = path.resolve(__dirname, '../');

const app = new Koa();

app.use(logger());
app.use(cors());
app.use(koaBody({ multipart: true }));
app.use(router.routes());
app.use(router.allowedMethods());
app.use(serve(publicPath));

app.listen({ port: config.PORT });
console.log(`🚀 Server ready at http://localhost:${config.PORT}`);
