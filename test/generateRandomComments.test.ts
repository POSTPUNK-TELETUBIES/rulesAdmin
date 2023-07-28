import { describe, test, expect } from 'vitest';
import { generateRandomComments } from '../src/tools/index';

describe('generateRandomComments', () => {
  test('should generate random comments with correct properties', () => {
    const count = 5;
    const comments = generateRandomComments(count);

    expect(comments).toHaveLength(count);

    for (let i = 0; i < count; i++) {
      const comment = comments[i];
      expect(comment).toBeDefined();
      expect(comment).toHaveProperty('id');
      expect(comment).toHaveProperty('author');
      expect(comment).toHaveProperty('timestamp');
      expect(comment).toHaveProperty('content');
      expect(typeof comment.id).toBe('number');
      expect(typeof comment.author).toBe('string');
      expect(typeof comment.timestamp).toBe('string');
      expect(typeof comment.content).toBe('string');
    }
  });
});
