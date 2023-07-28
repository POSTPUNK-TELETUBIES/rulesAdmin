import { test, expect } from 'vitest';
import { keyBy } from '../src/tools/index';

test('keyBy', () => {
  const users = [
    {
      id: 123,
      name: 'piero',
    },
    {
      id: 543,
      name: 'brenda',
    },
  ];
  const usersById = keyBy(users, 'id');

  expect(usersById[123]).toMatchObject({
    id: 123,
    name: 'piero',
  });
  expect(usersById[432]).toBe(undefined);
});
