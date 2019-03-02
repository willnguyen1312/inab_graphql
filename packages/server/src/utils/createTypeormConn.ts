import { createConnection, getConnectionOptions } from 'typeorm';
import { IS_PROD } from '../config';
import { User } from '../entity/User';

export const createTypeormConn = async () => {
  const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);
  (await IS_PROD)
    ? createConnection({
        ...connectionOptions,
        url: process.env.DATABASE_URL as string,
        entities: [User],
        name: 'default',
      } as any).then(conn => conn.runMigrations())
    : createConnection({ ...connectionOptions, name: 'default' });
};
