import { Factory } from 'miragejs';
import { LanguageDTO } from '../../src/types/supabase';
import { LANGUAGES } from '../data/languages';

export const languageFactory = Factory.extend<LanguageDTO>({
  alias(n) {
    return LANGUAGES[n - 1]?.alias ?? 'no alias';
  },

  id(n) {
    return n.toString();
  },

  name(n) {
    return LANGUAGES[n - 1]?.name ?? 'no name';
  },
});
