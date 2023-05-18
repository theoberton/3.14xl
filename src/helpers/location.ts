export function isTestnet() {
	return (
		location.host.startsWith('testnet') ||
		location.host.includes('ngrok')
		// location.host.includes('localhost')
	);
}
