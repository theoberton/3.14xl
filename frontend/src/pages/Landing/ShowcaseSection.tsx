import { EditionCard } from '@/components';
import { IEditionItem } from '@/components/EditionCard/interface';
import { useTonClient } from '@/hooks';
import { getManagerContracts } from '@/libs/apiClient';

import styles from '@/pages/Landing/styles.module.scss';
import { useCallback, useEffect, useState } from 'react';

function ShowcaseSection() {
	const tonClient = useTonClient();
	const [editions, setEditions] = useState<IEditionItem[]>([]);

	const getEditions = useCallback(async () => {
		try {
			const contracts = await getManagerContracts();

			const result = contracts.result.map(data => {
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

			setEditions(result.slice(0, 3));
		} catch (error) {
			console.log('error', error);
		}
	}, [tonClient]);

	useEffect(() => {
		getEditions();
	}, []);

	return (
		<section className={styles.ShowcaseSection}>
			{editions &&
				editions.map(edition => (
					<EditionCard edition={edition} key={edition.name + edition.owner} />
				))}
		</section>
	);
}

export default ShowcaseSection;
