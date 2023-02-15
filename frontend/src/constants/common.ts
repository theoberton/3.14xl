const env = process.env.NODE_ENV;
export const routerBaseName = env === 'production' ? '/3.14xl/' : '/';

export enum EDITIONS_SIZES {
	FIXED = 'fixed',
	OPEN_EDITION = 'openEdition',
}

export const DATE_VALIDITY_REGEX =
	/^(?:0[1-9]|[12][0-9]|3[01])[-\/.](?:0[1-9]|1[012])[-\/.](?:19\d{2}|20[01][0-9]|20[0-9][0-9])\b/;

export const DATE_INPUT_FORMAT = 'MM/dd/yyyy H:m';
