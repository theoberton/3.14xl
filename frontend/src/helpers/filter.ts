export function addressFilter(address: string) {
	return address.slice(0, 4) + '...' + address.slice(-4);
}

export function mintDateFilter(date: Date) {
	return new Intl.DateTimeFormat('en', { dateStyle: 'medium', timeStyle: 'short' }).format(date);
}
