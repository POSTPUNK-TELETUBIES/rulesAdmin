import { Factory } from 'miragejs';
import { RuleDTO, Severity, Type } from '../../src/types/supabase';

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
