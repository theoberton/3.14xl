import { toNano } from 'ton-core';
import {
	Blockchain,
	SandboxContract,
	SendMessageResult,
	TreasuryContract,
} from '@ton-community/sandbox';
import { dateToUnix } from '../../helpers/date';
import { NftCollection } from '../NftCollection';
import { NftManager } from '.';
import { getDefaultNftCollectionData } from '../NftCollection/helpers';

import { NftCollectionCodeCell } from '../NftCollection/NftCollection.source';
import '@ton-community/test-utils'; // register matchers

/** Helpers */
async function deployNftCollection(
	creator: SandboxContract<TreasuryContract>,
	manager: SandboxContract<NftManager>,
	collection: SandboxContract<NftCollection>
) {
	await creator.send({
		value: toNano('0.05'),
		to: manager.address,
		init: manager.init,
	});

	await creator.send({
		value: toNano('0.05'),
		to: collection.address,
		init: collection.init,
	});

	await manager.sendSetCollectionAddress(creator.getSender(), {
		collectionAddress: collection.address,
	});
}

async function mint(
	buyer: SandboxContract<TreasuryContract>,
	manager: SandboxContract<NftManager>,
	collection: SandboxContract<NftCollection>,
	mintPrice: bigint
) {
	const collectionData = await collection.getCollectionData();

	const result = await manager.sendMintSafe(
		buyer.getSender(),
		{
			nextItemIndex: collectionData.nextItemIndex,
			itemOwner: buyer.address,
		},
		mintPrice
	);

	return result;
}

function expectSuccessfullMint(
	mintResult: SendMessageResult & { result: void },
	creator: SandboxContract<TreasuryContract>,
	manager: SandboxContract<NftManager>,
	collection: SandboxContract<NftCollection>,
	mintPrice: bigint
) {
	expect(mintResult.transactions).toHaveTransaction({
		from: manager.address,
		to: creator.address,
		value: mintPrice,
		success: true,
	});

	expect(mintResult.transactions).toHaveTransaction({
		from: collection.address,
		deploy: true,
	});
}

function expectFailedMint(
	mintResult: SendMessageResult & { result: void },
	creator: SandboxContract<TreasuryContract>,
	manager: SandboxContract<NftManager>,
	collection: SandboxContract<NftCollection>,
	mintPrice: bigint
) {
	expect(mintResult.transactions).not.toHaveTransaction({
		from: manager.address,
		to: creator.address,
		value: mintPrice,
	});

	expect(mintResult.transactions).not.toHaveTransaction({
		from: collection.address,
		deploy: true,
	});
}

describe('NftManager', () => {
	it('should deploy manager and collection contracts', async () => {
		const blkch = await Blockchain.create();

		const creator = await blkch.treasury('creator');
		const managerInitData = {
			owner: creator.address,
			debug: BigInt(Math.floor(Math.random() * 10000)),
			mintPrice: toNano('1'),
			maxSupply: 0n,
			mintDateStart: 0n,
			mintDateEnd: 0n
		};

		const nftManager = NftManager.createFromConfig(managerInitData);

		const manager = blkch.openContract(nftManager);
		const nftCollectionConfig = getDefaultNftCollectionData({
			ownerAddress: manager.address,
		});

		const collection = blkch.openContract(
			NftCollection.createFromConfig(nftCollectionConfig, NftCollectionCodeCell)
		);

		await deployNftCollection(creator, manager, collection);

		const collectionData = await collection.getCollectionData();
		expect(collectionData.ownerAddress.equals(manager.address)).toBeTruthy();

		expect((await manager.getOwner()).equals(creator.address)).toBeTruthy();
		expect((await manager.getCollectionAddress()).equals(collection.address)).toBeTruthy();

		const buyer = await blkch.treasury('buyer');
		const { mintPrice } = await manager.getManagerData();

		const firstMintResult = await mint(buyer, manager, collection, mintPrice);

		expectSuccessfullMint(firstMintResult, creator, manager, collection, mintPrice);

		const secondMintResult = await mint(buyer, manager, collection, mintPrice);

		expect(secondMintResult.transactions).toHaveTransaction({
			from: collection.address,
			deploy: true,
		});
	});

	it('should restrict minting by max supply rule', async () => {
		const blkch = await Blockchain.create();

		const creator = await blkch.treasury('creator');

		const managerInitData = {
			owner: creator.address,
			debug: BigInt(Math.floor(Math.random() * 10000)),
			mintPrice: toNano('1'),
			maxSupply: 1n,
			mintDateStart: 0n,
			mintDateEnd: 0n
		};

		const nftManager = NftManager.createFromConfig(managerInitData);

		const manager = blkch.openContract(nftManager);

		const nftCollectionConfig = getDefaultNftCollectionData({
			ownerAddress: manager.address,
		});
		const collection = blkch.openContract(
			NftCollection.createFromConfig(nftCollectionConfig, NftCollectionCodeCell)
		);

		await deployNftCollection(creator, manager, collection);

		const buyer1 = await blkch.treasury('buyer1');
		const buyer2 = await blkch.treasury('buyer2');
		const { mintPrice } = await manager.getManagerData();

		const successfullMintResult = await mint(buyer1, manager, collection, mintPrice);

		expectSuccessfullMint(successfullMintResult, creator, manager, collection, mintPrice);

		const failedMintResult = await mint(buyer2, manager, collection, mintPrice);

		expectFailedMint(failedMintResult, creator, manager, collection, mintPrice);
	});

	it('should restrict minting by start rule', async () => {
		const blkch = await Blockchain.create();
		const creator = await blkch.treasury('creator');

		const managerInitData = {
			owner: creator.address,
			debug: BigInt(Math.floor(Math.random() * 10000)),
			mintPrice: toNano('1'),
			maxSupply: 0n,
			mintDateStart: BigInt(dateToUnix(new Date()) + 1000),
			mintDateEnd: 0n
		};

		const nftManager = NftManager.createFromConfig(managerInitData);

		const manager = blkch.openContract(nftManager);

		const nftCollectionConfig = getDefaultNftCollectionData({
			ownerAddress: manager.address,
		});
		const collection = blkch.openContract(
			NftCollection.createFromConfig(nftCollectionConfig, NftCollectionCodeCell)
		);

		await deployNftCollection(creator, manager, collection);

		const buyer = await blkch.treasury('buyer');
		const { mintPrice } = await manager.getManagerData();

		const mintResult = await mint(buyer, manager, collection, mintPrice);

		expectFailedMint(mintResult, creator, manager, collection, mintPrice);
	});

	it('should restrict minting by end rule', async () => {
		const blkch = await Blockchain.create();
		const creator = await blkch.treasury('creator');

		const managerInitData = {
			owner: creator.address,
			debug: BigInt(Math.floor(Math.random() * 10000)),
			mintPrice: toNano('1'),
			maxSupply: 0n,
			mintDateStart: 0n,
			mintDateEnd: BigInt(dateToUnix(new Date()) - 1000)
		};

		const nftManager = NftManager.createFromConfig(managerInitData);

		const manager = blkch.openContract(nftManager);

		const nftCollectionConfig = getDefaultNftCollectionData({
			ownerAddress: manager.address,
		});
		const collection = blkch.openContract(
			NftCollection.createFromConfig(nftCollectionConfig, NftCollectionCodeCell)
		);

		await deployNftCollection(creator, manager, collection);

		const buyer = await blkch.treasury('buyer');
		const { mintPrice } = await manager.getManagerData();

		const mintResult = await mint(buyer, manager, collection, mintPrice);

		expectFailedMint(mintResult, creator, manager, collection, mintPrice);
	});

	it('should allow mint just in time', async () => {
		const blkch = await Blockchain.create();
		const creator = await blkch.treasury('creator');

		const managerInitData = {
			owner: creator.address,
			debug: BigInt(Math.floor(Math.random() * 10000)),
			mintPrice: toNano('1'),
			maxSupply: 0n,
			mintDateStart: BigInt(dateToUnix(new Date()) - 1000),
			mintDateEnd: BigInt(dateToUnix(new Date()) + 1000)
		};

		const nftManager = NftManager.createFromConfig(managerInitData);

		const manager = blkch.openContract(nftManager);

		const nftCollectionConfig = getDefaultNftCollectionData({
			ownerAddress: manager.address,
		});
		const collection = blkch.openContract(
			NftCollection.createFromConfig(nftCollectionConfig, NftCollectionCodeCell)
		);

		await deployNftCollection(creator, manager, collection);

		const buyer = await blkch.treasury('buyer');
		const { mintPrice } = await manager.getManagerData();

		const mintResult = await mint(buyer, manager, collection, mintPrice);

		expectSuccessfullMint(mintResult, creator, manager, collection, mintPrice);
	});
});
