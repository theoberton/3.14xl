import { ThirdwebStorage } from '@thirdweb-dev/storage';
import { useCallback, useState } from 'react';
import WiderIcon from '@/assets/images/svg/common/wider.svg';
import { addressFilter } from '@/helpers';
import { CollectionData, CollectionContent } from '@/wrappers/types';
import { PreviewImageModal } from '@/components';
import { useMediaQuery } from 'react-responsive';

import styles from './styles.module.scss';

const thirdwebStorage = new ThirdwebStorage();

function EditionPreview({
	content,
}: {
	collectionData: CollectionData;
	content: CollectionContent;
}) {
	const [isImagePreviewOpened, setImagePreviewOpenedStatus] = useState(false);

	const closePreviewImageModal = useCallback(() => {
		setImagePreviewOpenedStatus(false);
	}, []);

	const openPreviewImage = useCallback(() => {
		setImagePreviewOpenedStatus(true);
	}, []);
	const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1199.98px)' });

	return (
		<div className={styles.editionDetailsPreview}>
			{isImagePreviewOpened && (
				<PreviewImageModal media={content.image} isOpen closeModal={closePreviewImageModal} />
			)}
			<div className={styles.editionDetailsPreviewImage} onClick={openPreviewImage}>
				<img src={thirdwebStorage.resolveScheme(content.image)} />
			</div>
			<div className={styles.editionDetailsPreviewInfo}>
				{!isTabletOrMobile && (
					<div className={styles.editionDetailsPreviewFooterItem} onClick={openPreviewImage}>
						<img src={WiderIcon} className={styles.editionDetailsPreviewFooterItemImage} />
					</div>
				)}
				<div className={styles.editionDetailsPreviewFooterItem}>
					<p>Creator: </p>
					<div>{addressFilter(content.feeRecipient)}</div>
				</div>
			</div>
		</div>
	);
}

export default EditionPreview;
