import { useAsync } from 'react-use';
import TonWeb from 'tonweb';
import { useParams } from 'react-router-dom';

import EditionDetails from './Details';
import EditionPreview from './Preview';
import styles from './styles.module.scss';
import { CollectionContent } from '../CreateEditionOld/index';

const tonweb = new TonWeb(
	new TonWeb.HttpProvider('https://testnet.toncenter.com/api/v2/jsonRPC', {
		apiKey: '4ff403d7763b912464241855e03d414c1deda0d73811ceb6c694d2b5f8737611',
	})
);

export default function EditionDetailsPage() {
	const { collectionAddress } = useParams();

	const collectionDataAsync = useAsync(async () => {
		const collection = new TonWeb.token.nft.NftCollection(tonweb.provider, { address: collectionAddress });
		const collectionData = await collection.getCollectionData();
		const content: CollectionContent = await fetch(collectionData.collectionContentUri).then(res => res.json());

		return { collectionData, content };
	}, []);

	if (collectionDataAsync.loading) {
		return <div>loading...</div>
	}

	if (collectionDataAsync.error) {
		console.error(collectionDataAsync.error);
		return <div>Waiting for deploy...</div>
	}

	if (!collectionDataAsync.value) {
		console.error("No value");
		return <div>Something went wrong</div>
	}

	return (
		<div className={styles.editionDetailsContainer}>
			<EditionPreview collectionData={collectionDataAsync.value.collectionData} content={collectionDataAsync.value.content} />
			<EditionDetails collectionData={collectionDataAsync.value.collectionData} content={collectionDataAsync.value.content} />
		</div>
	);
}
