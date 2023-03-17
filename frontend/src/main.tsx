import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';

import '@/assets/styles/index.scss';
import 'react-responsive-modal/styles.css';

import ApplicationRoutes from '@/router/routes';

import { TonConnectUIProvider } from '@tonconnect/ui-react';

const manifestUrl = 'https://pi.oberton.io/tonconnect-manifest.json';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<TonConnectUIProvider manifestUrl={manifestUrl} walletsList={{ wallets: ['Tonkeeper'] }}>
			<HelmetProvider>
				<ApplicationRoutes />
			</HelmetProvider>
		</TonConnectUIProvider>
	</React.StrictMode>
);
