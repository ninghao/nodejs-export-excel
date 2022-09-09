import dotenv from 'dotenv';

dotenv.config();

/**
 * 应用配置
 */
export const APP_PORT = process.env.APP_PORT || 3000;

/**
 * CORS
 */
export const ALLOW_ORIGIN = process.env.ALLOW_ORIGIN || '*';
