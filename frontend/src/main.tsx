import React from 'react'
import ReactDOM from 'react-dom/client'
import '@/assets/styles/index.scss';
import ApplicationRoutes from './router/routes';

import { TonConnectUIProvider } from '@tonconnect/ui-react';

// TO DO : replace with custom
const manifestUrl = 'https://raw.githubusercontent.com/ton-community/tutorials/main/03-client/test/public/tonconnect-manifest.json';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <TonConnectUIProvider manifestUrl={manifestUrl}> 
      <ApplicationRoutes />
    </TonConnectUIProvider>
  </React.StrictMode>
)
