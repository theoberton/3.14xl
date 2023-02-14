import { useFormikContext } from 'formik';
import { Label } from '@/components';
import styles from '@/pages/CreateEdition/styles.module.scss';
import { FormValues } from '@/pages/CreateEdition/interfaces';
import tonLogo from '@/assets/images/svg/common/tonLogo.svg';
import PreviewImageMobile from '@/pages/CreateEdition/PreviewImageMobile';
import { useState, useCallback } from 'react';

function PreviewMobile() {
	const { values } = useFormikContext<FormValues>();
	const [isImagePreviewOpened, setImagePreviewOpenedStatus] = useState(false);

	const closePreviewImageModal = useCallback(() => {
		setImagePreviewOpenedStatus(false)
	}, []);
	const openPreviewImage = useCallback(() => {
		setImagePreviewOpenedStatus(true)

	}, []);

	return (
		<div className={styles.previewSectionMobile}>
			<div className={styles.previewMobile}>
				{
					<div
						className={styles.previewImageWrapperMobile}
						onClick={openPreviewImage}
					>
						{values.media ? (
							<img className={styles.previewImageMobile} src={values.media} />
						) : (
							<img className={styles.previewImageEmptyMobile} />
						)}
					</div>
				}
				{/* <div className={styles.previewLabels}>
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
				</div> */}
				<div className={styles.previewMainAttributesMobile}>
          <Label text={values.symbol ? values.symbol : '$SYMBOL'} grey mini />
					<div className={styles.previewMainAttributesNameMobile}>
						{values.name ? values.name : 'Collection name'}
					</div>
				</div>
        <div className={styles.previewMainAttributesPriceMobile}>
            <img src={tonLogo} className={styles.tonLogoMobile}/>
            {`${values.price ? values.price : '0.00'} TON`}
          </div>
			</div>
			{
				values.media &&
					<PreviewImageMobile
						isOpen={isImagePreviewOpened}
						closeModal={closePreviewImageModal}
						media={values.media}
					/>
			}
		</div>
	);
}

export default PreviewMobile;
