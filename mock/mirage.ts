import { Model, createServer, Response } from 'miragejs';
import { USER } from './data/user';
import { GROUP_SELECTORS } from './data/groupSelectors';
import { LANGUAGES } from './data/languages';

export const server = () => {
  createServer({
    models: {
      token: Model,
      language: Model,
      selectors: Model,
    },

    routes() {
      this.urlPrefix = 'https://wripanqhmwgnrnknbgkb.supabase.co';

      //INICIO DE SESION
      this.namespace = '/auth/v1';

      this.post('/token', (_, request) => {
        const { grant_type } = request.queryParams;

        if (grant_type === 'password') {
          return USER;
        } else {
          return new Response(
            400,
            { 'Content-Type': 'application/json' },
            { errors: ['incorrect username or password'] }
          );
        }
      });

      this.namespace = '/rest/v1';

      //DEVOLVER TODOS LOS LENGUAGES
      this.get('/languages', (_, request) => {
        if (request.queryParams.select === '*') {
          return LANGUAGES;
        } else {
          return new Response(
            404,
            { 'Content-Type': 'application/json' },
            { errors: ['there is no data for this selection'] }
          );
        }
      });

      //DEVOLVER LAS OPCIONES DEL SELECTOR DE CADA LENGUAGE
      this.get('/qualityprofiles', (_, request) => {
        const { select, language_id } = request.queryParams;

        if (select === '*' && language_id) {
          return GROUP_SELECTORS[language_id];
        } else {
          return new Response(
            404,
            { 'Content-Type': 'application/json' },
            { errors: ['there are no selectors for this option'] }
          );
        }
      });

      //DEVOLVER LAS OPCIONES DE CADA SELECTOR
      // this.get('status', (_, request) => {
      //   const { select, qualityProfile_id, offset, limit, order } = request.queryParams

      // })
    },
  });
};
