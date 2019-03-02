import { createConnection, getConnectionOptions } from 'typeorm';
import { User } from '../entity/User';

export const createTypeormConn = async () => {
  const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);
  return process.env.NODE_ENV === 'production'
    ? createConnection({
        ...connectionOptions,
        url: process.env.DATABASE_URL,
        entities: [User],
        name: 'default',
      } as any).then(conn => conn.runMigrations())
    : createConnection({ ...connectionOptions, name: 'default' });
};
