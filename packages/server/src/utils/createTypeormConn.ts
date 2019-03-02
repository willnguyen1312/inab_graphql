import { createConnection, getConnectionOptions } from 'typeorm';
import { IS_PROD, POSTGRES_DATABASE_URL } from '../config';
import { User } from '../entity/User';

export const createTypeormConn = async () => {
  const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);
  return IS_PROD
    ? createConnection({
        ...connectionOptions,
        url: POSTGRES_DATABASE_URL,
        entities: [User],
        name: 'default',
      } as any)
    : createConnection({ ...connectionOptions, name: 'default' });
};
