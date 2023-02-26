import { useTonConnectUI, ConnectedWallet } from '@tonconnect/ui-react';
import { Sender, SenderArguments } from 'ton-core';

type TonConnectReturn = {
	sender: Sender;
	connected: boolean;
	connectWallet: () => Promise<ConnectedWallet>;
};

export function useTonConnect(): TonConnectReturn {
	const [tonConnectUI] = useTonConnectUI();

	return {
		sender: {
			send: async (args: SenderArguments) => {
				tonConnectUI.sendTransaction({
					messages: [
						{
							address: args.to.toString(),
							amount: args.value.toString(),
							payload: args.body?.toBoc().toString('base64'),
						},
					],
					validUntil: Date.now() + 5 * 60 * 1000, // 5 minutes for user to approve
				});
			},
		},
		connected: tonConnectUI.connected,
		connectWallet: tonConnectUI.connectWallet,
	};
}
