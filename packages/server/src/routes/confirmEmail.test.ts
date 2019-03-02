import fetch from 'node-fetch';
import { TEST_HOST } from '../config';

test('sends invalid back if bad id sent', async () => {
  const response = await fetch(`${TEST_HOST}/confirm/131292`);
  const text = await response.text();
  expect(text).toEqual('invalid');
});
