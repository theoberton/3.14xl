import { ThirdwebStorage } from '@thirdweb-dev/storage';

import { addressFilter } from '@/helpers';
import { CollectionData, CollectionContent } from '@/wrappers/types';

import styles from './styles.module.scss';

const thirdwebStorage = new ThirdwebStorage();

function EditionPreview({
	content,
}: {
	collectionData: CollectionData;
	content: CollectionContent;
}) {
	return (
		<div className={styles.editionDetailsPreview}>
			<div className={styles.editionDetailsPreviewImage}>
				<img src={thirdwebStorage.resolveScheme(content.image)} />
			</div>
			<div className={styles.editionDetailsPreviewInfo}>
				<p>Creator: </p>
				<div>{addressFilter(content.feeRecipient)}</div>
			</div>
		</div>
	);
}

export default EditionPreview;
