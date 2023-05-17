import { compile } from '@ton-community/blueprint';

describe.skip('SBTItem', () => {
	it.only('Should compile sbt item', async () => {
		const code = await compile('../../3.14xl/src/wrappers/SbtItem/SbtItem');
		console.log('SBTTTTSSSS');
		console.log(code.toBoc().toString('base64'));
		console.log('_______');
	});
});
