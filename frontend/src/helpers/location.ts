export function isTestnet() {
	return location.host.startsWith('testnet') || Boolean(localStorage?.getItem('testnet'));
}
