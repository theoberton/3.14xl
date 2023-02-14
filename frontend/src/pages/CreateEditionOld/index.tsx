import { useState } from 'react';
import TonWeb from 'tonweb';
import { useTonAddress, useTonConnectUI, TonConnectUI } from '@tonconnect/ui-react';
import { useIPFS } from '@/hooks/useIpfs';
import { IPFS } from 'ipfs-core';
import PinataClient from '@pinata/sdk';

import { beginCell, toNano, Address, storeStateInit } from "ton-core";
import { NftManager, storeSetNftCollectionAddress } from "./pixel_NFTManager";

const pinataClient = new PinataClient('927deb7fb786df139a7c', '083bb02c296236ca5dd5fce3f3d573e6a787d60167524641a0e5c62bdff0edeb')
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
}

export const createEdition = async (ipfs: IPFS, tonConnectUI: TonConnectUI, params: Params) => {
	if (!ipfs) throw new Error('IPFS not inited');

	/** Upload collection metadata */
	const content = {
		name: params.name,
		description: params.description,
		image: params.image,
		// external_link: 'https://matketplacecreatures.io',
		// seller_fee_basis_points: 100,
		// fee_recipient: address,
		symbol: params.symbol,
		feeRecipient: params.creatorAddress,
	};
	// const collectionContentIpfs = await ipfs.add(JSON.stringify(content, null, 2));
	// console.log(collectionContentIpfs);

console.log('start pinning');
	const collectionContentIpfs = await pinataClient.pinJSONToIPFS(content);
console.log(collectionContentIpfs)

console.log('https://cloudflare-ipfs.com/ipfs/' + collectionContentIpfs.IpfsHash)
	const ownerAddress = new TonWeb.utils.Address(params.creatorAddress);

	const nftManagerContract = await NftManager.fromInit(Address.parse(params.creatorAddress), BigInt(Math.floor(Math.random() * 1000000)));

	/** Generate deploy link */
	const nftCollection = new NftCollection(tonweb.provider, {
		ownerAddress: new TonWeb.utils.Address(nftManagerContract.address.toString()),
		royalty: 0.05,
		royaltyAddress: ownerAddress,
		collectionContentUri: 'https://cloudflare-ipfs.com/ipfs/' + collectionContentIpfs.IpfsHash,
		nftItemContentBaseUri: 'https://cloudflare-ipfs.com/ipfs/' + collectionContentIpfs.IpfsHash,
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
	const ipfs = useIPFS();
	const address = useTonAddress();
	const [tonConnectUI] = useTonConnectUI();
	const [file, setFile] = useState<File | null>();


	return (
		<div>
			<button onClick={async () => {
				if (!ipfs) throw new Error('IPFS not inited');
				if (!file) throw new Error('No file');

				/** Upload collection image */
				const collectionImageIpfs = await ipfs.add(file);
				console.log(collectionImageIpfs);

				await createEdition(ipfs, tonConnectUI, {
					name: 'OBERTON',
					description: 'nice very nice',
					image: 'https://cloudflare-ipfs.com/ipfs/' + collectionImageIpfs.cid.toString(),
					symbol: '$OBER',
					creatorAddress: address
				})
			}}>Create Edition</button>

			<input type="file" onChange={e => setFile(e.target.files?.item(0))} />
		</div>
	);
}
