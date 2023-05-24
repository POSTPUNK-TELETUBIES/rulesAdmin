import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';
import App from './App.tsx';
import { reactQueryClient } from './lib/modules/reactQuery.ts';
import { TourProvider } from '@reactour/tour';
import './index.css';

import hotkeys from 'hotkeys-js';
import { setOpenMenu } from './lib/observers/index.ts';
import { Typography } from '@mui/material';
import { woopraDomain } from './lib/config/woopra.ts';
import { AuthWrapper } from './components/AuthWrapper/index.tsx';

hotkeys('ctrl+m', (event) => {
  event.preventDefault();

  setOpenMenu(true);
});

if (woopraDomain) {
  window.woopra.config({
    domain: woopraDomain,
    outgoing_tracking: true,
    download_tracking: true,
    click_tracking: true,
  });

  window.woopra.track();
}

//TODO: pasar steps a configuracion
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <TourProvider
      steps={[
        {
          selector: '.language',
          content:
            'Selecciona el lenguaje de programación del cual deseas consultar reglas.',
        },
        {
          selector: '.mainFilters',
          content: 'Ahora procede a seleccionar el perfil a consultar',
        },
        {
          selector: '.actualState',
          content:
            'Este es el estado actual de la regla en Sonarqube. Las reglas activas son las que analizan los repositorios.',
        },
        {
          selector: '.proposedState',
          content:
            'Aquí podrás proponer si una regla debe estar activada o desactivada, recuerda que tu propuesta no se verá reflejada en SonarQube inmediatamente.',
        },
        {
          selector: '.dragableMenu',
          content: (
            <Typography>
              Las opciones de descarga y guardado se encuentran en este botón.
              Si no lo encuentras rápido, ubícalo con <kbd>ctrl</kbd> +{' '}
              <kbd>m</kbd>, ¡también lo puedes mover por toda la pantalla!
            </Typography>
          ),
        },
        /* {
          selector: '.menuDragable',
          content: '¡Ya puedes empezar!',
        } */
      ]}
    >
      <AuthWrapper>
        <QueryClientProvider client={reactQueryClient}>
          <App />
        </QueryClientProvider>
      </AuthWrapper>
    </TourProvider>
  </React.StrictMode>
);
