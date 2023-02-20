import { useState } from 'react';
import TonWeb from 'tonweb';
import { useTonAddress, useTonConnectUI, TonConnectUI } from '@tonconnect/ui-react';
import { ThirdwebStorage } from '@thirdweb-dev/storage';

const storage = new ThirdwebStorage();

import { beginCell, toNano, Address, storeStateInit } from "ton-core";
import { NftManager, storeSetNftCollectionAddress } from "./pixel_NFTManager";

const tonweb = new TonWeb(
	new TonWeb.HttpProvider('https://testnet.toncenter.com/api/v2/jsonRPC', {
		apiKey: '4ff403d7763b912464241855e03d414c1deda0d73811ceb6c694d2b5f8737611',
	})
);

const { NftCollection, NftItem } = TonWeb.token.nft;

export type Params = {
	name: string;
	description: string;
	image: string;
	symbol: string;
	creatorAddress: string;
	price: string;
	maxSupply: string;
}

export const createEdition = async (tonConnectUI: TonConnectUI, params: Params) => {
	/** Upload collection metadata */
	const content = {
		name: params.name,
		description: params.description,
		image: params.image,
		// external_link: 'https://matketplacecreatures.io',
		// seller_fee_basis_points: 100,
		// fee_recipient: address,
		price: params.price,
		symbol: params.symbol,
		feeRecipient: params.creatorAddress,
	};

	const collectionContentUri = await storage.upload(content);
	const collectionContentUrl = storage.resolveScheme(collectionContentUri);

	console.log(collectionContentUrl)

	const ownerAddress = new TonWeb.utils.Address(params.creatorAddress);
	console.log(ownerAddress);

	const nftManagerParams = {
		owner: Address.parse(params.creatorAddress),
		seed: BigInt(Math.floor(Math.random() * 10000)),
		mintPrice: toNano(params.price),
		maxSupply: BigInt(params.maxSupply)
	};
	console.log(nftManagerParams);
	const nftManagerContract = await NftManager.fromInit(nftManagerParams.owner, nftManagerParams.seed, nftManagerParams.mintPrice, nftManagerParams.maxSupply);
console.log(nftManagerContract);
	/** Generate deploy link */
	const nftCollection = new NftCollection(tonweb.provider, {
		ownerAddress: new TonWeb.utils.Address(nftManagerContract.address.toString()),
		royalty: 0.05,
		royaltyAddress: ownerAddress,
		collectionContentUri: collectionContentUrl,
		nftItemContentBaseUri: collectionContentUrl,
		nftItemCodeHex: NftItem.codeHex,
	});

	console.log(nftCollection);

	const nftCollectionAddress = await nftCollection.getAddress();
	console.log('collection address=', nftCollectionAddress.toString(true, true, true));

	const stateInit = (await nftCollection.createStateInit()).stateInit;
	const stateInitBoc = await stateInit.toBoc(false);
	const stateInitBase64 = TonWeb.utils.bytesToBase64(stateInitBoc);

	const transaction = {
		validUntil: Date.now() + 1000000,
		messages: [{
			address: nftCollectionAddress.toString(true, true, true),
			amount: toNano('0.05').toString(),
			stateInit: stateInitBase64,
		}, {
			address: nftManagerContract.address.toString(),
			amount: toNano('0.05').toString(),
			payload: beginCell().store(storeSetNftCollectionAddress({
				$$type: 'SetNftCollectionAddress',
				nft_collection_address: Address.parse(nftCollectionAddress.toString(true, true, true)),
			})).endCell().toBoc().toString('base64'),
			stateInit: beginCell().storeWritable(storeStateInit(nftManagerContract.init!)).endCell().toBoc().toString('base64'),
		}]
	};

	try {
		const result = await tonConnectUI.sendTransaction(transaction);
		console.log(result)
		// you can use signed boc to find the transaction 
		// const someTxData = await myAppExplorerService.getTransaction(result.boc);
		// alert('Transaction was sent successfully', someTxData);
	} catch (e) {
			console.error(e);
	}
};

export function CreateEditionOld() {
	const address = useTonAddress();
	const [tonConnectUI] = useTonConnectUI();
	const [file, setFile] = useState<File | null>();


	return (
		<div>
			<button onClick={async () => {
				if (!file) throw new Error('No file');

				/** Upload collection image */
				const collectionImageUri =  await storage.upload(file);
				const collectionImageUrl = storage.resolveScheme(collectionImageUri);
				console.log(collectionImageUrl);

				await createEdition(tonConnectUI, {
					name: 'OBERTON',
					description: 'nice very nice',
					image: collectionImageUrl,
					symbol: '$OBER',
					price: '0.05',
					creatorAddress: address,
					maxSupply: '0'
				})
			}}>Create Edition</button>

			<input type="file" onChange={e => setFile(e.target.files?.item(0))} />
		</div>
	);
}
