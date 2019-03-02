import { logInfo } from '@inab/common';
import * as connectRedis from 'connect-redis';
import 'dotenv/config';
import * as RateLimit from 'express-rate-limit';
import * as session from 'express-session';
import { GraphQLServer } from 'graphql-yoga';
import * as RateLimitRedisStore from 'rate-limit-redis';
import 'reflect-metadata';
import { IS_PROD, IS_TEST } from './config';
import { redisSessionPrefix } from './constants';
import { redis } from './redis';
import { confirmEmail } from './routes/confirmEmail';
import { createTestConn } from './testUtils/createTestConn';
import { createTypeormConn } from './utils/createTypeormConn';
import { genSchema } from './utils/genSchema';

const SESSION_SECRET = 'chachacha';
const RedisStore = connectRedis(session as any);

export const startServer = async () => {
  if (IS_TEST) {
    await redis.flushall();
  }

  const server = new GraphQLServer({
    schema: genSchema() as any,
    context: ({ request }) => ({
      redis,
      url: request.protocol + '://' + request.get('host'),
      session: request.session,
      req: request,
    }),
  });

  server.express.use(
    new RateLimit({
      store: new RateLimitRedisStore({
        client: redis,
      }),
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
      delayMs: 0, // disable delaying - full speed until the max limit is reached
    })
  );

  server.express.use(
    session({
      store: new RedisStore({
        client: redis as any,
        prefix: redisSessionPrefix,
      }),
      name: 'qid',
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: IS_PROD,
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      },
    } as any)
  );

  const cors = {
    credentials: true,
    origin: IS_TEST ? '*' : (process.env.FRONTEND_HOST as string),
  };

  server.express.get('/confirm/:id', confirmEmail);

  if (IS_TEST) {
    await createTestConn(true);
  } else {
    await createTypeormConn();
  }

  const port = IS_TEST ? 0 : process.env.PORT || 4000;
  const app = await server.start({
    cors,
    port,
  });
  logInfo(`Server is running on port ${port}`);

  return app;
};
