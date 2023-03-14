import { Locker as TactLocker, storeClaim } from '../tact-output/locker_Locker';
import { Address, beginCell, Cell, ContractProvider, Sender } from 'ton-core';
import { BaseLocalContract } from '../core/BaseLocalContract';


export class Locker extends BaseLocalContract {
	constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {
		super(address, init);
	}

	static fromAddress(address: Address) {
		return new Locker(address);
	}

	static async fromInit(hash: bigint, item: Cell) {
    const locker = await TactLocker.fromInit(hash, item);

    return new Locker(locker.address, locker.init);
  }

	async sendClaim(
		provider: ContractProvider,
		via: Sender,
		params: {
			value: bigint;
			password: bigint;
		}
	) {
		await provider.internal(via, {
			value: params.value,
			body: beginCell()
				.store(storeClaim({
          $$type: 'Claim',
          password: params.password
        }))
				.endCell(),
		});
	}	
}


