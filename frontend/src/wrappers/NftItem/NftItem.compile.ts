import { CompilerConfig } from '@ton-community/blueprint';

export const compile: CompilerConfig = {
	targets: [
		'contracts/nft-item.fc',
		'contracts/op-codes.fc',
		'contracts/params.fc',
		'contracts/stdlib.fc',
	],
};
