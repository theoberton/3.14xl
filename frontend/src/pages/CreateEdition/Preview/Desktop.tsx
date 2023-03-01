import { useFormikContext } from 'formik';
import { Label } from '@/components';
import styles from '@/pages/CreateEdition/styles.module.scss';
import { FormValues } from '@/pages/CreateEdition/interfaces';

type Props = {
	openPreviewImage: () => void;
};

function EditionPreview({ openPreviewImage }: Props) {
	const { values } = useFormikContext<FormValues>();

	return (
		<div className={styles.previewSection}>
			<div className={styles.preview}>
				{
					<div className={styles.previewImageWrapper} onClick={openPreviewImage}>
						{values.media ? (
							<img className={styles.previewImage} src={values.media} />
						) : (
							<img className={styles.previewImageEmpty} />
						)}
					</div>
				}
				<div className={styles.previewLabels}>
					<div className={styles.previewLabelItem}>
						<div className={styles.previewLabel}>Edition price</div>
						<div className={styles.previewLabelValue}>
							{`${values.price ? values.price : '0.00'} TON`}
						</div>
					</div>
					<div className={styles.previewLabelItem}>
						<div className={styles.previewLabel}>Total supply</div>
						<div className={styles.previewLabelValue}>OPEN</div>
					</div>
				</div>
				<div className={styles.previewMainAttributes}>
					<div className={styles.previewMainAttributesName}>
						{values.name ? values.name : 'Collection name'}
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
