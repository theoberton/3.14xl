import { ThirdwebStorage } from '@thirdweb-dev/storage';
import { useCallback, useState } from 'react';
import WiderIcon from '@/assets/images/svg/common/wider.svg';
import { CollectionContent } from '@/wrappers/types';
import { CreatorLabel, PreviewImageModal } from '@/components';
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
				<CreatorLabel creator={content.feeRecipient} />
			</div>
		</div>
	);
}

export default EditionPreview;
