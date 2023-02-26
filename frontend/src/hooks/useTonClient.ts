import { getHttpEndpoint } from '@orbs-network/ton-access';
import { TonClient } from 'ton';
import { useAsyncInitialize } from './useAsyncInitialize';

export function useTonClient() {
	const network = location.host.startsWith('testnet') ? 'testnet' : 'mainnet';

	return useAsyncInitialize(
		async () =>
			new TonClient({
				endpoint: await getHttpEndpoint({ network }),
			})
	);
}
