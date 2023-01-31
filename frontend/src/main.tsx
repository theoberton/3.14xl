import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/index.scss';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/routes';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
