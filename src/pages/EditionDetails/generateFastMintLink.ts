import { composeMintTransaction } from './helper';
import { isTestnet } from '@/helpers/location';
import { EditionData } from '@/helpers';
import { CollectionContent } from '@/wrappers/types';
import { ThirdwebStorage } from '@thirdweb-dev/storage';
import { anonMintIndexMarker } from '@/wrappers/constants';

const storage = new ThirdwebStorage();

export const generateFastMinkLink = async (
	collectionData: EditionData,
	content: CollectionContent,
	address: string
) => {
	const returnUrl = `https://${isTestnet() ? 'testnet.' : ''}pi.oberton.io/#/edition/${address}`;

	const transactionParams = composeMintTransaction(
		{
			...collectionData,
			nextItemIndex: anonMintIndexMarker,
		},
		content
	);

	const transactionRequestBody = {
		type: 'sign-raw-payload',
		params: transactionParams,
		response_options: {
			return_url: returnUrl,
		},
	};
	const transactionRequest = {
		version: '0',
		body: transactionRequestBody,
	};

	const mintDataUrl = await storage.upload(JSON.stringify(transactionRequest), {
		uploadWithGatewayUrl: true,
	});

	const finalMintDataUrl = mintDataUrl.replaceAll('https://', '');

	const fastMintLink = `https://app.tonkeeper.com/v1/txrequest-url/${finalMintDataUrl}`;

	return fastMintLink;
};
