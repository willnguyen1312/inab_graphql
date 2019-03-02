import * as Redis from 'ioredis';
import { IS_PROD, REDIS_HOST, REDIS_PASSWORD, REDIS_PORT } from './config';

export const redis = IS_PROD
  ? new Redis({
      port: REDIS_PORT,
      host: REDIS_HOST,
      password: REDIS_PASSWORD,
    })
  : new Redis();
