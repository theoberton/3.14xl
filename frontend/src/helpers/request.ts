import axios, { Method, AxiosError, AxiosRequestConfig } from 'axios';
import qs from 'qs';
import { HTTP_METHODS_MAP } from '@/constants/common';
import _ from 'lodash';
import { isTestnet } from '@/helpers/location';

const API_HOST = 'https://api-pixel.com';
// const API_HOST = 'http://localhost:3000';

type ServerError = {
	statusCode: number;
	message: [string];
	error: string;
};

async function handleFailedRequest(error: AxiosError<any, any>) {
	if (error.response) {
		// The request was made and the server responded with a status code
		// that falls out of the range of 2xx
		return hanleServerError(error.response.data, error.response.status);
	}
	if (error.request) {
		// The request was made but no response was received
		// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
		// http.ClientRequest in node.js

		console.log('Error request', error.request);
	} else {
		// Something happened in setting up the request that triggered an Error
		console.log('Error', error.message);
	}

	throw error;
}

async function hanleServerError(data: ServerError, code: number) {
	if (code === 404) {
		// return window.location.replace(`${window.location.origin}/#/not-found`);
		throw new Error();
	}

	if (code >= 500) {
		throw new Error();
	}

	throw data;
}

export async function request(method: Method, endpoint: string, data?: Object, params = {}) {
	const requestParams: AxiosRequestConfig = {
		method,
		url: `${API_HOST}/${endpoint}`,
		headers: {
			testnet: isTestnet(),
		},
		...params,
	};

	if (method === HTTP_METHODS_MAP.GET) {
		const stringifiedQuery = qs.stringify(data);
		const queryString = stringifiedQuery ? `?${stringifiedQuery}` : '';

		requestParams.url += queryString;
	} else {
		requestParams.data = data;
	}

	if (method === HTTP_METHODS_MAP.PUT) {
		const stringifiedQuery = qs.stringify(params);
		const queryString = stringifiedQuery ? `?${stringifiedQuery}` : '';

		requestParams.url += queryString;
	}

	try {
		const axiosResponse = await axios(requestParams);

		return axiosResponse.data;
	} catch (error: unknown) {
		if (axios.isAxiosError(error)) {
			return handleFailedRequest(error);
		} else {
			console.log('unexpected error: ', error);
			return 'An unexpected error occurred';
		}
	}
}
// TO DO: REMAKE
export async function requestFullUrl(url: string, method: Method, data?: Object, params = {}) {
	const requestParams: AxiosRequestConfig = {
		method,
		url,
		...params,
	};

	if (method === HTTP_METHODS_MAP.GET) {
		const stringifiedQuery = qs.stringify(data);
		const queryString = stringifiedQuery ? `?${stringifiedQuery}` : '';

		requestParams.url += queryString;
	} else {
		requestParams.data = data;
	}

	if (method === HTTP_METHODS_MAP.PUT) {
		const stringifiedQuery = qs.stringify(params);
		const queryString = stringifiedQuery ? `?${stringifiedQuery}` : '';

		requestParams.url += queryString;
	}

	try {
		const axiosResponse = await axios(requestParams);

		return axiosResponse.data;
	} catch (error: unknown) {
		if (axios.isAxiosError(error)) {
			return handleFailedRequest(error);
		} else {
			console.log('unexpected error: ', error);
			return 'An unexpected error occurred';
		}
	}
}
