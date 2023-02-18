import { createBrowserHistory, To } from 'history';

export const history = createBrowserHistory();

export const goBack = () => history.back();

export const navigate = (route: To) => history.push(route);

export const replace = (route: To) => history.replace(route);
