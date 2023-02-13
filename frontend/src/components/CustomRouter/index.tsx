import { useState, useLayoutEffect } from 'react';
import { Router } from 'react-router-dom';
import { BrowserHistory } from 'history';

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
			basename="/3.14xl/"
			location={state.location}
			navigationType={state.action}
			navigator={history}
		/>
	);
}
