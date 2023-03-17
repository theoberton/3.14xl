import { Address } from 'ton';

export function print(...args: any[]) {
	console.log(...args);
}

export function printSeparator() {
	console.log(
		'========================================================================================'
	);
}

export function printHeader(name: string) {
	printSeparator();
	console.log('Contract: ' + name);
	printSeparator();
}

export function printAddress(address: Address, testnet: boolean = true) {
	console.log('Address: ' + address.toString({ testOnly: testnet }));
	console.log(
		'Explorer: ' +
			'https://' +
			(testnet ? 'testnet.' : '') +
			'ton.cx/address/' +
			address.toString({ testOnly: testnet })
	);
	printSeparator();
}
