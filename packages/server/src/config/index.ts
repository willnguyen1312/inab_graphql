export const IS_PROD = process.env.NODE_ENV === 'prod';
export const IS_TEST = process.env.NODE_ENV === 'test';

export const POSTGRES_DATABASE_URL = process.env.DATABASE_URL;

export const REDIS_PASSWORD = process.env.REDIS_PASSWORD as string;
export const REDIS_HOST = process.env.REDIS_HOST as string;
export const REDIS_PORT = Number(process.env.REDIS_PORT);

export const FRONTEND_HOST = process.env.FRONTEND_HOST as string;
export const TEST_HOST = process.env.TEST_HOST as string;
export const PORT = process.env.PORT;
