import { createConnection, getConnectionOptions } from 'typeorm';
import { IS_PROD, POSTGRES_DATABASE_URL } from '../config';
import { User } from '../entity/User';

export const createTypeormConn = async () => {
  const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);
  (await IS_PROD)
    ? createConnection({
        ...connectionOptions,
        url: POSTGRES_DATABASE_URL,
        entities: [User],
        name: 'default',
      } as any).then(conn => conn.runMigrations())
    : createConnection({ ...connectionOptions, name: 'default' });
};
