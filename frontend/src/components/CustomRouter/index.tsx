import { useState, useLayoutEffect } from 'react';
import { Router } from 'react-router-dom';
import { BrowserHistory } from 'history';
import { BASE_PATH } from '@/constants/common';

interface CustomRouterHistory {
	history: BrowserHistory;
	basename?: string;
	children?: React.ReactNode;
}

export function CustomRouter({ history, ...props }: CustomRouterHistory) {
	const [state, setState] = useState({
		action: history.action,
		location: history.location,
	});

	useLayoutEffect(() => history.listen(setState), [history]);

	return (
		<Router
			{...props}
			basename={BASE_PATH}
			location={state.location}
			navigationType={state.action}
			navigator={history}
		/>
	);
}
