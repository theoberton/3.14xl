import { useFormikContext } from 'formik';
import { Label } from '@/components';
import { FormValues } from '@/pages/CreateEdition/interfaces';
import { ReactComponent as TonLogo } from '@/assets/images/svg/common/tonLogo.svg';
import { priceFilter } from '@/helpers';

import styles from './styles.module.scss';

type Props = {
	openPreviewImage: () => void;
};

function PreviewMobileMedia({ openPreviewImage }: Props) {
	const { values } = useFormikContext<FormValues>();

	if (!values.media) {
		return <div className={styles.previewMobileMediaEmpty} />;
	}

	return (
		<div className={styles.previewMobileMediaImage} style={{ backgroundImage: `url("${values.media}")` }} onClick={openPreviewImage} />
	)
}

function PreviewMobile({ openPreviewImage }: Props) {
	const { values } = useFormikContext<FormValues>();

	return (
		<div className={styles.previewMobileSection}>
			<PreviewMobileMedia openPreviewImage={openPreviewImage} />				
			<div className={styles.previewMobileMain}>
				<Label text={values.symbol || '$SYMBOL'} grey mini />
				<div className={styles.previewMobileMainName}>
					{values.name || 'Edition name'}
				</div>
			</div>
			<div className={styles.previewMobilePriceBlock}>
				<TonLogo />
				<span>{priceFilter(values.price)}</span>
			</div>
		</div>
	);
}

export default PreviewMobile;
