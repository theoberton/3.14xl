import { ThirdwebStorage } from '@thirdweb-dev/storage';
import { CollectionData } from 'tonweb';
import styles from './styles.module.scss';
import { addressFilter } from '@/helpers';
import { CollectionContent } from '../CreateEditionOld/index';

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
