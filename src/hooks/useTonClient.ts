import { getHttpEndpoint } from '@orbs-network/ton-access';
import { TonClient } from 'ton';
import { useAsyncInitialize } from './useAsyncInitialize';
import { isTestnet } from '@/helpers/location';

export function useTonClient() {
	const network = isTestnet() ? 'testnet' : 'mainnet';

	return useAsyncInitialize(
		async () =>
			new TonClient({
				endpoint: await getHttpEndpoint({ network }),
			})
	);
}
