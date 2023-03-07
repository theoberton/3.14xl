import { Address } from 'ton-core';
import { isEmpty } from 'lodash';

export function convertToBounceableAddress(randomAddress: string) {
	if (isEmpty(randomAddress)) {
		return null;
	}

	const result = Address.parseFriendly(randomAddress);

	return result.address.toString();
}
