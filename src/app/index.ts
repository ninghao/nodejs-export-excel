import express from 'express';
import cors from 'cors';
import appRouter from './app.router';
import { defaultErrorHandler } from './app.middleware';
import { ALLOW_ORIGIN } from './app.config';

/**
 * 创建应用
 */
const app = express();

/**
 * 处理 JSON
 */
app.use(express.json());

/**
 * 跨域资源共享
 */
app.use(
  cors({
    origin: ALLOW_ORIGIN,
    exposedHeaders: 'X-Total-Count',
  }),
);

/**
 * 路由
 */
app.use(appRouter);

/**
 * 默认异常处理器
 */
app.use(defaultErrorHandler);

/**
 * 导出应用
 */
export default app;
