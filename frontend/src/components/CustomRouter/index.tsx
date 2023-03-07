import { useState, useLayoutEffect } from 'react';
import { HashRouter } from 'react-router-dom';
import { history } from '@/helpers';
import { History } from 'history';

interface CustomRouterHistory {
	history: History;
	basename?: string;
	children?: React.ReactNode;
}

export function CustomRouter({ history }: CustomRouterHistory) {
	const [state, setState] = useState({
		action: history.action,
		location: history.location,
	});

	useLayoutEffect(() => history.listen(setState), [history]);

	return (
		// ts-ingore next-line
		<HashRouter history={state} />
	);
}
