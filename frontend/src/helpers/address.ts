import { Address } from 'ton-core';

export function convertToBounceableAddress(randomAddress: string | undefined | null) {
	if (randomAddress === null || randomAddress === undefined || randomAddress === '') {
		return null;
	}

	const result = Address.parseFriendly(randomAddress);

	return result.address.toString();
}
