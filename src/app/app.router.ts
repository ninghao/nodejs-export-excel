import fs from 'fs';
import path from 'path';
import express, { Request, Response, NextFunction } from 'express';
import excel from 'exceljs';
import ShortUniqueId from 'short-unique-id';
import { posts } from './app.data';

const uid = new ShortUniqueId();

const router = express.Router();

router.get('/', (request, response) => {
  response.send({ title: '小白兔的开发之路' });
});

router.get(
  '/export-to-excel',
  async (request: Request, response: Response, next: NextFunction) => {
    // 工作簿
    const workbook = new excel.Workbook();

    // 工作表
    const worksheet = workbook.addWorksheet('诗词');

    // 文件存储路径
    const rootPath = 'excel';

    // 检查目录是否存在
    const fileExist = fs.existsSync('./excel');

    // 目录不存在就创建一个
    if (!fileExist) {
      fs.mkdir('./excel', error => {
        console.log(error);
      });
    }

    // 工作表__栏目
    worksheet.columns = [
      { header: '序号', key: 'id', width: 10 },
      { header: '标题', key: 'title', width: 10 },
      { header: '正文', key: 'content', width: 10 },
      { header: '作者', key: 'author', width: 10 },
    ];

    // 在工作表里添加数据行
    posts.forEach(post => {
      worksheet.addRow(post);
    });

    // 加粗工作者的标题栏
    worksheet.getRow(1).eachCell(cell => {
      cell.font = { bold: true };
    });

    try {
      // 文件名
      const fileName = `${uid()}.xlsx`;

      // 写入 Excel 文件
      await workbook.xlsx.writeFile(`${rootPath}/${fileName}`);

      // 响应
      response.sendFile(fileName, {
        root: rootPath,
        headers: {
          'Content-Type':
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        },
      });
    } catch (error) {
      next(error);
    }
  },
);

/**
 * 导出路由
 */
export default router;
