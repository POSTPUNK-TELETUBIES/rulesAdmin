import { Factory } from 'miragejs';
import { RulesStatus } from '../../src/types/supabase';

export const statusFactory = Factory.extend<RulesStatus>({
  id(n) {
    return n.toString();
  },

  created_at(_n) {
    return new Date();
  },

  isActive(n) {
    return !!(n % 2);
  },

  isActiveSonar(n) {
    return !!(n % 2);
  },

  qualityProfile_id(_n) {
    return this.qualityprofile.id;
  },

  rule_id(_n) {
    return this.rule.id;
  },

  updated_at(_n) {
    return new Date();
  },

  lastActualization(_n) {
    return new Date();
  },
});
