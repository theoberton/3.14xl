import { HTTP_METHODS_MAP } from "@/constants";
import { requestFull } from "@/helpers";

const TELEGRAM_URL = 'https://telegram-bot-obertondev-gmailcom.vercel.app/api/webhook';

export function sendMessageToChat() {
	// requestFull(TELEGRAM_URL, HTTP_METHODS_MAP.POST, data);

}