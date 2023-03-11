import { HTTP_METHODS_MAP } from '@/constants';
import { requestFullUrl } from '@/helpers';
import { TelegramMessage } from './types';

const TELEGRAM_URL = 'https://baae-178-127-35-3.eu.ngrok.io/api/webhook';

const composeTelegramWebAppMessage = (data: TelegramMessage) => {
	return {
		webAppMessage: data
	};
};


export const sendMessageToChat = (data: TelegramMessage) =>
	requestFullUrl(TELEGRAM_URL, HTTP_METHODS_MAP.POST, composeTelegramWebAppMessage(data));
