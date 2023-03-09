import { isTestnet } from '@/helpers/location';

export function fromUnixToDate(time?: number) {
	const dateStart = new Date((time ?? 0) * 1000);

	return dateStart;
}


export function composeFullEditionAddress(editionAddress: string) {
		return `https://${isTestnet() ? 'testnet' : ''}pi.oberton.io/#/edition/${editionAddress}`;
}