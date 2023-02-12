import { useState } from 'react';
import TonWeb from 'tonweb';
import { useTonAddress } from '@tonconnect/ui-react';
import useIpfs from '@/hooks/useIpfs';
import qs from 'qs';
import { toNano } from 'ton-core';

const tonweb = new TonWeb(
	new TonWeb.HttpProvider('https://testnet.toncenter.com/api/v2/jsonRPC', {
		apiKey: '4ff403d7763b912464241855e03d414c1deda0d73811ceb6c694d2b5f8737611',
	})
);

const { NftCollection, NftItem } = TonWeb.token.nft;
const { Address } = TonWeb.utils;

export function CreateEditionPage() {
	const ipfs = useIpfs();
	const address = useTonAddress();
	const [file, setFile] = useState<File | null>();

	const createEdition = async () => {
		if (!ipfs) throw new Error('IPFS not inited');
		if (!file) throw new Error('No file');

		/** Upload collection image */
		const collectionImageIpfs = await ipfs.add(file);
		console.log(collectionImageIpfs);

		/** Upload collection metadata */
		const content = {
			name: 'Oberton',
			description: 'OBER MEGATON',
			image: 'https://ipfs.io/ipfs/' + collectionImageIpfs.cid.toString(),
			external_link: 'https://matketplacecreatures.io',
			seller_fee_basis_points: 100,
			fee_recipient: address,
		};
		const collectionContentIpfs = await ipfs.add(JSON.stringify(content, null, 2));
		console.log(collectionContentIpfs);

		/** Generate deploy link */
		const ownerAddress = new Address(address);
		const nftCollection = new NftCollection(tonweb.provider, {
			ownerAddress: ownerAddress,
			royalty: 0.05,
			royaltyAddress: ownerAddress,
			collectionContentUri: 'https://ipfs.io/ipfs/' + collectionContentIpfs.cid.toString(),
			nftItemContentBaseUri:
				'https://raw.githubusercontent.com/ton-blockchain/token-contract/main/nft/web-example/',
			nftItemCodeHex: NftItem.codeHex,
		});

		console.log(nftCollection);

		const nftCollectionAddress = await nftCollection.getAddress();
		console.log('collection address=', nftCollectionAddress.toString(true, true, true));

		const stateInit = (await nftCollection.createStateInit()).stateInit;
		const stateInitBoc = await stateInit.toBoc(false);
		const stateInitBase64 = TonWeb.utils.bytesToBase64(stateInitBoc);
		const link =
			'ton://' +
			`transfer/` +
			nftCollectionAddress.toString(true, true, true) +
			'?' +
			qs.stringify({
				text: 'Deploy contract',
				amount: toNano('0.05'),
				init: stateInitBase64,
			});

		window.open(link);
	};

	return (
		<div>
			<button onClick={createEdition}>Create Edition</button>

			<input type="file" onChange={e => setFile(e.target.files?.item(0))} />
		</div>
	);
}
