import { HTTP_METHODS_MAP } from '@/constants';
import { requestFullUrl } from '@/helpers';
import { TelegramMessage } from './types';

const TELEGRAM_URL = 'https://telegram-bot-obertondev-gmailcom.vercel.app/api/webhook';

const composeTelegramWebAppMessage = (data: TelegramMessage) => {
	return {
		webAppMessage: data
	};
};


export const sendMessageToChat = (data: TelegramMessage) =>
	requestFullUrl(TELEGRAM_URL, HTTP_METHODS_MAP.POST, composeTelegramWebAppMessage(data));
