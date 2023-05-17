import { CompilerConfig } from '@ton-community/blueprint';

export const compile: CompilerConfig = {
	targets: [
		'src/contracts/sbt-item.fc',
		// 'src/contracts/op-codes.fc',
		// 'src/contracts/params.fc',
		// 'src/contracts/stdlib.fc',
	],
};
