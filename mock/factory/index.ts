import { Factory } from 'miragejs';
import {
  LanguageDTO,
  QualityProfileDTO,
  RuleDTO,
  RulesStatus,
  Severity,
  Type,
} from '../../src/types/supabase';

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

export const rulesFactory = Factory.extend<RuleDTO>({
  id(n) {
    return n.toString();
  },
  key(_n) {
    return 'css:S4647';
  },

  lang_id(_n) {
    return this.language.id;
  },

  name(n) {
    return n.toString();
  },

  user_email(n) {
    return n.toString();
  },

  description(n) {
    return n.toString();
  },

  htmlDesc(_n) {
    return '<h1>Titulo de la descripcion</h1><p>Cuerpo de la descripcion</p><pre><code>const a = ()=> </code></pre>';
  },

  severity(_n) {
    return Severity.Critical;
  },

  type(_n) {
    return Type.Bug;
  },
});

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
