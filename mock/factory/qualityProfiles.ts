import { Factory } from 'miragejs';
import { QualityProfileDTO } from '../../src/types/supabase';

export const qualityprofilesFactory = Factory.extend<QualityProfileDTO>({
  createdAt(_n) {
    return new Date();
  },

  id(n) {
    return n.toString();
  },

  isDefault(_n) {
    return true;
  },

  key(n) {
    return n.toString();
  },

  language_id(_n) {
    return this.language.id;
  },

  name(n) {
    return n.toString();
  },

  updated_at(_n) {
    return new Date();
  },
});
