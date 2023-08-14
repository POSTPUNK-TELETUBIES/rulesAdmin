import { describe, expect, test } from 'vitest';
import { renderConditional } from '../src/tools/index';
import faker from 'faker';

describe('render test', () => {
  test('render condition is false', () => {
    const randomValue1 = faker.lorem.words();
    const randomValue2 = faker.lorem.words();
    const result = renderConditional(false, randomValue1, randomValue2);
    expect(result).toBe(randomValue2);
  });

  test('render condition is true', () => {
    const randomValue1 = faker.lorem.words();
    const randomValue2 = faker.lorem.words();
    const result = renderConditional(true, randomValue1, randomValue2);
    expect(result).toBe(randomValue1);
  });
});
