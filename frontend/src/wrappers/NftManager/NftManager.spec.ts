import { toNano } from 'ton-core';
import { WalletContractV4 } from 'ton';
import {
	Blockchain,
	SandboxContract,
	SendMessageResult,
	TreasuryContract,
} from '@ton-community/sandbox';
import { dateToUnix } from '../../helpers/date';
import { calcPercent } from '../../helpers/math';
import { NftCollection } from '../NftCollection';
import { NftManager } from '.';
import { getDefaultNftCollectionData } from '../NftCollection/helpers';

import { NftCollectionCodeCell } from '../NftCollection/NftCollection.source';
import '@ton-community/test-utils'; // register matchers

const pixelWallet = WalletContractV4.create({ workchain: 0, publicKey: Buffer.from('M5FeZeMPgnPKNabfcw7nU37OD2QMhJsfZcucjTxdcH0=', 'base64') });

async function setupPixelWallet(blkch: Blockchain) {
	const pixelTeam = await blkch.treasury("pixel_team");
	await pixelTeam.send({
		to: pixelWallet.address,
		value: toNano('1'),
		init: pixelWallet.init
	});
}

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
	buyer: SandboxContract<TreasuryContract>,
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

	expect(mintResult.transactions).toHaveTransaction({
		from: manager.address,
		to: pixelWallet.address,
		value: calcPercent(mintPrice, 0.05),
		success: true
	});

	expect(mintResult.transactions).toHaveTransaction({
		from: manager.address,
		to: buyer.address,
		value: value => (value ?? 0) > toNano("0.01"),
		success: true
	})
}

function expectFailedMint(
	mintResult: SendMessageResult & { result: void },
	creator: SandboxContract<TreasuryContract>,
	buyer: SandboxContract<TreasuryContract>,
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

	expect(mintResult.transactions).not.toHaveTransaction({
		from: manager.address,
		to: pixelWallet.address
	});

	expect(mintResult.transactions).toHaveTransaction({
		from: manager.address,
		to: buyer.address,
		value: value => (value ?? 0) > mintPrice + calcPercent(mintPrice, 0.05) + toNano('0.1'),
		success: true
	})
}

describe('NftManager', () => {
	it('should deploy manager and collection contracts', async () => {
		const blkch = await Blockchain.create();
		
		await setupPixelWallet(blkch);
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

		expectSuccessfullMint(firstMintResult, creator, buyer, manager, collection, mintPrice);

		const secondMintResult = await mint(buyer, manager, collection, mintPrice);

		expectSuccessfullMint(secondMintResult, creator, buyer, manager, collection, mintPrice);
	});

	it('should restrict minting by max supply rule', async () => {
		const blkch = await Blockchain.create();

		await setupPixelWallet(blkch);
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

		expectSuccessfullMint(successfullMintResult, creator, buyer1, manager, collection, mintPrice);

		const failedMintResult = await mint(buyer2, manager, collection, mintPrice);

		expectFailedMint(failedMintResult, creator, buyer2, manager, collection, mintPrice);
	});

	it('should restrict minting by start rule', async () => {
		const blkch = await Blockchain.create();
		const creator = await blkch.treasury('creator');
		await setupPixelWallet(blkch);

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

		expectFailedMint(mintResult, creator, buyer, manager, collection, mintPrice);
	});

	it('should restrict minting by end rule', async () => {
		const blkch = await Blockchain.create();
		const creator = await blkch.treasury('creator');
		await setupPixelWallet(blkch);

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

		expectFailedMint(mintResult, creator, buyer, manager, collection, mintPrice);
	});

	it('should allow mint just in time', async () => {
		const blkch = await Blockchain.create();
		const creator = await blkch.treasury('creator');
		await setupPixelWallet(blkch);

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

		expectSuccessfullMint(mintResult, creator, buyer, manager, collection, mintPrice);
	});
});
