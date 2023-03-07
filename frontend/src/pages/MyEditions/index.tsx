import EditionsHeader from './Header';
import { Helmet } from 'react-helmet-async';
import { EditionCard } from '@/components';
import { getManagerContractByOwner } from '@/libs/apiClient';
import { convertToBounceableAddress } from '@/helpers';

import { PageLoader } from '@/components';
import { useAsync } from 'react-use';
import { isMintAllowed } from '@/helpers';

import styles from '@/pages/Explore/styles.module.scss';

import { useTonClient } from '@/hooks';
import { useTonAddress } from '@tonconnect/ui-react';

export default function ExplorePage() {
	const tonClient = useTonClient();
	const address = useTonAddress();

	const editions = useAsync(async () => {
		const bouncableAddress = convertToBounceableAddress(address);
		if (!bouncableAddress) return;

		const contracts = await getManagerContractByOwner(bouncableAddress);

		return contracts.result.map(data => {
			const currentDate = new Date();

			return {
				collectionAddress: data.collectionAddress,
				content: data.overviewData.content,
				dateStart: data.overviewData.dateStart,
				dateEnd: data.overviewData.dateEnd,
				price: data.overviewData.price,
				minted: null,
				limit: data.overviewData.limit,
				name: data.overviewData.name,
				owner: data.overviewData.owner,
			};
		});
	}, [tonClient, address]);

	if (editions.error && !editions.value) {
		throw editions.error;
	}

	if (editions.loading && !editions.value && !editions.error) {
		return <PageLoader />;
	}

	return (
		<div className={styles.editionsContainer}>
			<Helmet title={'3.14XL - Explore editions'} />
			<EditionsHeader />
			<div className={styles.editionsShowCase}>
				{editions.value &&
					editions.value.map(edition => (
						<EditionCard edition={edition} key={edition.name + edition.owner} />
					))}
			</div>
		</div>
	);
}
