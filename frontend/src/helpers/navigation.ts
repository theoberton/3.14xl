import { BASE_PATH } from '@/constants/common';
import { createBrowserHistory, To } from 'history';

export const history = createBrowserHistory();

export const goBack = () => history.back();

export const navigate = (route: To) => history.push(`${BASE_PATH}${route}`);

export const replace = (route: To) => history.replace(route);
