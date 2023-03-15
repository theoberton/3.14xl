import { ThirdwebStorage } from '@thirdweb-dev/storage';
import { useCallback, useState } from 'react';
import { CollectionContent } from '@/wrappers/types';
import { AddressLabel, PreviewImageModal } from '@/components';
import { EditionData } from '@/helpers';
import { useMediaQuery } from 'react-responsive';

// Hotfix for https://github.com/yocontra/react-responsive/issues/306, remove when resolved
console.log(useMediaQuery);

import styles from './styles.module.scss';

const thirdwebStorage = new ThirdwebStorage();

function EditionPreview({ content }: { collectionData: EditionData; content: CollectionContent }) {
	const [isImagePreviewOpened, setImagePreviewOpenedStatus] = useState(false);

	const closePreviewImageModal = useCallback(() => {
		setImagePreviewOpenedStatus(false);
	}, []);

	const openPreviewImage = useCallback(() => {
		setImagePreviewOpenedStatus(true);
	}, []);

	return (
		<div className={styles.editionDetailsPreview}>
			{isImagePreviewOpened && (
				<PreviewImageModal media={content.image} isOpen closeModal={closePreviewImageModal} />
			)}
			<div
				className={styles.editionDetailsPreviewImage}
				onClick={openPreviewImage}
				style={{
					backgroundImage: `url('${thirdwebStorage.resolveScheme(content.image)}')`,
				}}
			/>
			<div className={styles.editionDetailsPreviewInfo}>
				<p>CREATOR</p>
				<AddressLabel address={content.feeRecipient} />
			</div>
		</div>
	);
}

export default EditionPreview;
