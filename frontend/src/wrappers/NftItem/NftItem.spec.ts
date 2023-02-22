import '@ton-community/test-utils';

import { toNano } from 'ton-core';
import { Blockchain, SandboxContract, TreasuryContract } from '@ton-community/sandbox';

import { NftItem } from '.';
import { randomAddress } from './../utils';
import { NftItemData } from '../types';
import { getDefaultNftItemData } from './helpers';
import { NftItemCodeCell } from './NftItem.source';

describe('nft item smc', () => {
	describe('nft item getters', () => {
		let blockchain: Blockchain | null;
		let contract: SandboxContract<NftItem> | null;
		let nftItem: NftItem | null;
		let nftItemConfig: NftItemData | null;
		let ownerOfItem: SandboxContract<TreasuryContract> | null;
		let nftCollection: SandboxContract<TreasuryContract> | null;

		beforeEach(async () => {
			blockchain = await Blockchain.create();

			ownerOfItem = await blockchain.treasury('owner_of_item');
			let nftCollection = await blockchain.treasury('collection_address');

			const ownerOfItemAddress = ownerOfItem.address;

			nftItemConfig = getDefaultNftItemData({
				ownerAddress: ownerOfItemAddress,
				collectionAddress: nftCollection.address
			});

			nftItem = NftItem.createFromConfig(nftItemConfig, NftItemCodeCell);
			contract = blockchain.openContract(nftItem);
			const deployResult = await contract.sendDeploy(nftCollection.getSender(), nftItemConfig, toNano('1'));

			expect(deployResult.transactions).toHaveTransaction({
				from: nftCollection.address,
				to: contract.address,
				deploy: true,
				aborted: false,
			});
		});

		afterEach(() => {
			nftItemConfig = null;
			blockchain = null;
			contract = null;
			nftItem = null;
			ownerOfItem = null;
			nftCollection = null;
		});

		it('should return item data', async () => {
			let res = await contract!.getData();

			if (!res.isInitialized) {
				throw new Error();
			}

			expect(res.isInitialized).toBe(true);
			expect(res.index).toEqual(nftItemConfig!.itemIndex);
			expect(res.collectionAddress!.toString()).toEqual(
				nftItemConfig!.collectionAddress!.toString()
			);
			expect(res.ownerAddress.toString()).toEqual(nftItemConfig!.ownerAddress.toString());
			expect(res.content).toEqual(nftItemConfig!.content);
		});

		it('should transfer ownership', async () => {
			let newOwner = randomAddress();

			let ownershipTransferResult = await contract!.sendTransfer(ownerOfItem!.getSender(), {
				newOwner,
				forwardAmount: toNano('0.01'),
				responseTo: randomAddress(),
			});

			expect(ownershipTransferResult.transactions).toHaveTransaction({
				from: ownerOfItem!.address,
				to: contract!.address,
				success: true,
				outMessagesCount: 2,
			});

			let res = await contract!.getData();

			if (!res.isInitialized) {
				throw new Error();
			}

			expect(res.ownerAddress.toString()).toEqual(newOwner.toString());
		});
	});
});
