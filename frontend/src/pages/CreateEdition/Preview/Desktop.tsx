import { useField, useFormikContext } from 'formik';
import { Label } from '@/components';
import { FormValues } from '@/pages/CreateEdition/interfaces';
import { priceFilter } from '@/helpers';
import styles from './styles.module.scss';
import { EDITIONS_SIZES } from '@/constants/common';

type Props = {
	openPreviewImage: () => void;
};

function EditionPreview({ openPreviewImage }: Props) {
	const { values } = useFormikContext<FormValues>();

	const [editionSizeType] = useField('editionSize.type');

	const [editionSizeAmount] = useField('editionSize.amount');

	const [isOpen, isFixed] = [EDITIONS_SIZES.OPEN_EDITION, EDITIONS_SIZES.FIXED].map(
		v => v === editionSizeType.value
	);

	return (
		<div className={styles.previewSection}>
			<div className={styles.preview}>
				{values.media ? (
					<div
						className={styles.previewMediaImage}
						onClick={openPreviewImage}
						style={{ backgroundImage: `url("${values.media}")` }}
					/>
				) : (
					<div className={styles.previewMediaEmpty} />
				)}
				<div className={styles.previewLabels}>
					<div className={styles.previewLabelItem}>
						<div className={styles.previewLabel}>Edition price</div>
						<div className={styles.previewLabelValue}>{priceFilter(values.price)}</div>
					</div>
					<div className={styles.previewLabelItem}>
						<div className={styles.previewLabel}>Total supply</div>
						{isOpen && <div className={styles.previewLabelValue}>OPEN</div>}
						{isFixed && <div className={styles.previewLabelValue}> {editionSizeAmount.value}</div>}
					</div>
				</div>
				<div className={styles.previewMainAttributes}>
					<div className={styles.previewMainAttributesName}>
						{values.name ? values.name : 'Edition name'}
					</div>
					<Label text={values.symbol ? values.symbol : '$SYMBOL'} />
				</div>
				<div className={styles.previewMainAttributesDescription}>
					{values.description ? values.description : 'Description'}
				</div>
			</div>
		</div>
	);
}

export default EditionPreview;
