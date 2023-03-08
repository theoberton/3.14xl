import { createHashHistory } from 'history';

export const history = createHashHistory();

export const goBack = () => history.back();

export const navigate = (route: string, state: any) => history.push(route, state);

export const replace = (route: string, state: any) => history.replace(route, state);
