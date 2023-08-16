import { Model, createServer, Response, belongsTo } from 'miragejs';
import { LANGUAGES } from './data/languages';
import { USER } from './data/user';
import { supabaseURL } from '../src/lib/config/supabase';
import {
  languageFactory,
  qualityprofilesFactory,
  rulesFactory,
  statusFactory,
} from './factory';

class NotFoundResponse extends Response {
  constructor(errors = ['there is no data for this selection']) {
    super(404, { 'Content-Type': 'application/json' }, { errors });
  }
}

export const serverInit = () =>
  createServer({
    models: {
      qualityprofile: Model.extend({
        language: belongsTo(),
      }),
      language: Model,
      status: Model.extend({
        qualityprofile: belongsTo(),
        rule: belongsTo(),
      }),
      rule: Model.extend({
        language: belongsTo(),
      }),
    },

    factories: {
      language: languageFactory,
      qualityprofile: qualityprofilesFactory,
      status: statusFactory,
      rule: rulesFactory,
    },

    seeds(server) {
      const languages = server.createList('language', LANGUAGES.length);

      const qualityProfiles = languages.flatMap((language) =>
        server.createList('qualityprofile', 2, { language })
      );

      const rules = languages.flatMap((language) =>
        server.createList('rule', 10, { language })
      );

      rules.flatMap((rule) =>
        qualityProfiles
          .filter(({ language }) => language.id === rule.language.id)
          .map((qp) =>
            server.create('status', {
              rule,
              qualityprofile: qp,
            })
          )
      );
    },

    routes() {
      this.urlPrefix = `${supabaseURL}`;

      this.namespace = '/auth/v1';

      this.get('user', () => {
        return USER;
      });

      this.post('token', () => {
        return USER;
      });

      this.post('/logout', () => {
        return USER;
      });

      this.namespace = '/rest/v1';

      this.get('/languages', (schema, request) => {
        if (request.queryParams.select === '*')
          return schema.all('language').models;

        return new NotFoundResponse();
      });

      this.get('/qualityprofiles', (schema, request) => {
        const { select, language_id } = request.queryParams;

        if (select === '*' && language_id)
          return schema.where('qualityprofile', {
            language_id: language_id.replace('eq.', ''),
          }).models;

        return new NotFoundResponse();
      });

      this.get('/status', (schema, request) => {
        const { qualityProfile_id } = request.queryParams;

        const data = schema.where('status', {
          qualityProfile_id: qualityProfile_id.replace('eq.', ''),
        }).models;

        return data.map((status) => ({
          ...status.attrs,
          rules: (status.rule as any).attrs,
          qualityprofiles: (status.rule as any).attrs,
        }));
      });
    },
  });
