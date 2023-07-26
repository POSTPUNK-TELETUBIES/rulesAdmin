import { test, expect } from 'vitest';
import { getTimeAgo } from './getTimeAgo';

test('Debe devolver el tiempo relativo correctamente para fechas pasadas', () => {
  const now = new Date();
  const oneMinuteAgo = new Date(now.getTime() - 60 * 1000);
  const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
  const twoDaysAgo = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000);

  expect(getTimeAgo(oneMinuteAgo)).toEqual('hace 1 min');
  expect(getTimeAgo(oneHourAgo)).toEqual('hace 1 h');
  expect(getTimeAgo(twoDaysAgo)).toEqual('hace 2 d');
});

test('Debe devolver el tiempo relativo correctamente para fechas en el futuro', () => {
  const now = new Date();
  const oneSecondLater = new Date(now.getTime() + 1000);
  const tenMinutesLater = new Date(now.getTime() + 10 * 60 * 1000);
  const twoHoursLater = new Date(now.getTime() + 2 * 60 * 60 * 1000);
  const fiveDaysLater = new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000);
  const tenMonthsLater = new Date(
    now.getTime() + 10 * 30 * 24 * 60 * 60 * 1000
  );

  expect(getTimeAgo(oneSecondLater)).toEqual('en 1 s');
  expect(getTimeAgo(tenMinutesLater)).toEqual('en 10 min');
  expect(getTimeAgo(twoHoursLater)).toEqual('en 2 h');
  expect(getTimeAgo(fiveDaysLater)).toEqual('en 5 d');
  expect(getTimeAgo(tenMonthsLater)).toEqual('en 10 M');
});

test('Debe devolver "hace 1 s" para fechas muy cercanas al tiempo actual', () => {
  const now = new Date();
  expect(getTimeAgo(now)).toEqual('hace 1 s');
});
