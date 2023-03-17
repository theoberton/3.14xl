const tg = window.Telegram.WebApp;

export function useTelegram() {
	const onClose = () => {
		tg.close();
	};

	return {
		onClose,
		tg,
		user: tg.initDataUnsafe?.user,
		queryId: tg.initDataUnsafe?.query_id,
		initDataUnsafe: tg.initDataUnsafe,
		sendData: tg.sendData,
	};
}
