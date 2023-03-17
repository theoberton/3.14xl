import { useState, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { PageLoader } from '@/components';
import EditionDetails from './Details';
import EditionPreview from './Preview';
import styles from '@/pages/EditionDetails/styles.module.scss';
import { useTonClient } from '@/hooks/useTonClient';
import { getFullNftCollectionData, ManagerFullData } from '@/helpers';

export default function EditionDetailsPage() {
	const { collectionAddress } = useParams();
	const tonClient = useTonClient();
	const [currentNextNftItemIndex, setCurrentNftItemIndex] = useState(0);
	const [edtionDetails, setEditionDetails] = useState<ManagerFullData | null>(null);
	const [isLoading, setLoading] = useState(false);

	const getEditionDetails = useCallback(async () => {
		if (!collectionAddress || !tonClient) {
			return null;
		}
		setLoading(true);

		try {
			const fullData = await getFullNftCollectionData(tonClient, collectionAddress);

			setCurrentNftItemIndex(fullData.collectionData.nextItemIndex);
			setEditionDetails(fullData);
		} catch (error) {
			console.log('error', error);
		} finally {
			setLoading(false);
		}
	}, [tonClient, collectionAddress, currentNextNftItemIndex]);

	useEffect(() => {
		getEditionDetails();
	}, [collectionAddress, tonClient]);

	if (isLoading && !edtionDetails) {
		return <PageLoader />;
	}

	return (
		<div className={styles.editionDetailsContainer}>
			<Helmet title="3.14XL - Edition details" />
			{edtionDetails && (
				<>
					<EditionPreview
						collectionData={edtionDetails.collectionData}
						content={edtionDetails.content}
					/>
					<EditionDetails
						getEditionDetails={getEditionDetails}
						setCurrentNftItemIndex={setCurrentNftItemIndex}
						currentNextNftItemIndex={currentNextNftItemIndex}
						editionData={edtionDetails}
					/>
				</>
			)}
		</div>
	);
}
