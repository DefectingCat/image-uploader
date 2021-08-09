import { Context } from 'koa';
import Router from 'koa-router';
import fs from 'fs';
import path from 'path';

const router = new Router();

/**
 * 该方法用于创建两个读写流
 * 将接收到图片写入到本地文件
 * @param filePath 当前缓存的文件路径
 * @param fileName 当前缓存的文件名称
 * @returns
 */
const wirteFile = async (filePath: string, fileName: string) => {
  try {
    const publicPath = path.resolve(__dirname, '../../public/images');
    const rs = fs.createReadStream(filePath);
    const ws = fs.createWriteStream(`${publicPath}/${fileName}`);
    rs.pipe(ws);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

router.get('/', async (ctx: Context) => {
  ctx.body = 'Hello!';
});

router.post('/upload', async (ctx: Context) => {
  const file = ctx.request.files?.file;
  const results = [];

  if (file) {
    // 如果不是数组，则是一个文件
    if (!Array.isArray(file) && file.name) {
      const filePath = file.path;
      const fileName = file.name;
      const res = await wirteFile(filePath, fileName);
      const result = {
        fileName,
        url: `/upload/public/images/${fileName}`,
        status: 'ok',
      };
      results.push(result);
      res ? (ctx.body = results) : (ctx.body = 'Error!');
    } else {
      // 如果是数组，则接收到了多个文件
      if (Array.isArray(file)) {
        for (const item of file) {
          if (item.name) {
            const filePath = item.path;
            const fileName = item.name;
            const res = await wirteFile(filePath, fileName);
            const result = {
              fileName,
              url: `/upload/public/images/${fileName}`,
              status: 'ok',
            };
            results.push(result);
            res ? (ctx.body = results) : (ctx.body = 'Error!');
          }
        }
      }
    }
  }
});

export default router;
