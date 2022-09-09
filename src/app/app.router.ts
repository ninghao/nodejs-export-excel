import express from 'express';

const router = express.Router();

router.get('/', (request, response) => {
  response.send({ title: '小白兔的开发之路' });
});

/**
 * 导出路由
 */
export default router;
