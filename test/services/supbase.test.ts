import { test, afterAll, expect } from 'vitest';
import { describe } from 'node:test';
import { serverInit } from '../../mock';
import { LocalSupabaseClient } from '../../src/lib/service/supabase';
import { supabaseClient } from '../../src/lib/modules/supabase';

/* 
  TODO: this is going to be evaluated via cloud runners, check
  if mirage is the better solution to avoid overcharge into computational process or to replace it with
  a tiny mocker of fetch or another solution 
*/
const server = serverInit();

afterAll(() => {
  server.shutdown();
});

const facadeClient = LocalSupabaseClient.getInstance(supabaseClient);

describe('Supbase facade client', () => {
  test('Should return LanguageDTO', async () => {
    // TODO: this test is not actually providing complete coverage
    const response = await facadeClient.getAllLanguages();

    expect(response.length).toBeTruthy();

    const languagesData = server.db.languages;

    // TODO: evaluate if this needs refactor this to avoid time complexity
    response.forEach((language) =>
      expect(languagesData).toContainEqual(language)
    );
  });
});
