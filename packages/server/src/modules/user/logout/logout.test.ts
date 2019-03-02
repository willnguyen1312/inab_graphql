import * as faker from 'faker';
import { Connection } from 'typeorm';
import { TEST_HOST } from '../../../config';
import { User } from '../../../entity/User';
import { createTestConn } from '../../../testUtils/createTestConn';
import { TestClient } from '../../../utils/TestClient';

let conn: Connection;
faker.seed(Date.now() + 2);
const email = faker.internet.email();
const password = faker.internet.password();

let userId: string;
beforeAll(async () => {
  conn = await createTestConn();
  const user = await User.create({
    email,
    password,
    confirmed: true,
  }).save();
  userId = user.id;
});

afterAll(async () => {
  conn.close();
});

describe('logout', () => {
  test('multiple sessions', async () => {
    // computer 1
    const sess1 = new TestClient(TEST_HOST);
    // computer 2
    const sess2 = new TestClient(TEST_HOST);

    await sess1.login(email, password);
    await sess2.login(email, password);
    expect(await sess1.me()).toEqual(await sess2.me());
    await sess1.logout();
    expect(await sess1.me()).toEqual(await sess2.me());
  });

  test('single session', async () => {
    const client = new TestClient(TEST_HOST);

    await client.login(email, password);

    const response = await client.me();

    expect(response.data).toEqual({
      me: {
        id: userId,
        email,
      },
    });

    await client.logout();

    const response2 = await client.me();

    expect(response2.data.me).toBeNull();
  });
});
