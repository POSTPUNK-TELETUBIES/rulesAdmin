import { expect, test } from 'vitest';
import { renderConditional } from '../src/tools/index';

test('render condition is false', () => {
  const result = renderConditional(true, 'asdsa', 'zzzz');
  expect(result).toBe('zzzz');
});

test('render condition is true', () => {
  const result = renderConditional(false, 'asdsa', 'zzzz');
  expect(result).toBe('asdsa');
});
