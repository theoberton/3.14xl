import { useFormikContext } from 'formik';
import { Label } from '@/components';
import styles from '@/pages/CreateEdition/styles.module.scss';
import { FormValues } from '@/pages/CreateEdition/interfaces';
import tonLogo from '@/assets/images/svg/common/tonLogo.svg';
import { useState, useCallback } from 'react';
import { createManagerContract } from '@/libs/apiClient';
import { priceFilter } from '@/helpers';

type Props = {
	openPreviewImage: () => void;
};

function PreviewMobile({ openPreviewImage }: Props) {
	const { values } = useFormikContext<FormValues>();

	return (
		<div className={styles.previewSectionMobile}>
			<div className={styles.previewMobile}>
				{
					<div className={styles.previewImageWrapperMobile} onClick={openPreviewImage}>
						{values.media ? (
							<img className={styles.previewImageMobile} src={values.media} />
						) : (
							<img className={styles.previewImageEmptyMobile} />
						)}
					</div>
				}
				<div className={styles.previewMainAttributesMobile}>
					<Label text={values.symbol ? values.symbol : '$SYMBOL'} grey mini />
					<div className={styles.previewMainAttributesNameMobile}>
						{values.name ? values.name : 'Edition name'}
					</div>
				</div>
				<div className={styles.previewMainAttributesPriceMobile}>
					<img src={tonLogo} className={styles.tonLogoMobile} />
					{priceFilter(values.price)}
				</div>
			</div>
		</div>
	);
}

export default PreviewMobile;
