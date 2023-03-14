import { beginCell, toNano } from 'ton-core';
import { Blockchain } from '@ton-community/sandbox';
import { Locker } from '.';
import '@ton-community/test-utils';

describe('Locker', () => {
	it('should store and claim item and ton coins', async () => {
		const blkch = await Blockchain.create();
		const alice = await blkch.treasury('alice');
		const bob = await blkch.treasury('bob');

    const hash = 25n;
    const item = beginCell().storeUint(1000n, 32).endCell();
		const locker = await Locker.fromInit(hash, item).then(blkch.openContract);

    const storeResult = await alice.send({
      to: bob.address,
      value: toNano('1'),
      init: locker.init,
    });

    const claimResult = await locker.sendClaim(bob.getSender(), {
      value: toNano('0.05'),
      password: hash
    });

    console.debug(storeResult, claimResult);
	});
});
