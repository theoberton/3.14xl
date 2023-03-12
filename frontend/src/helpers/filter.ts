export function addressFilter(address: string) {
	return address.slice(0, 4) + '...' + address.slice(-4);
}

export function mintDateFilter(date: Date) {
	return new Intl.DateTimeFormat('en', { dateStyle: 'medium', timeStyle: 'short' }).format(date);
}

export function priceFilter(price: string) {
	const amount = +(Number(price) * 1.05).toFixed(2);

	return amount ? `${amount.toFixed(2)} TON` : 'Free';
}
