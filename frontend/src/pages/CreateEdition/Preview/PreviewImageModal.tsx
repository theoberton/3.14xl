import { useCallback } from 'react';
import { Modal } from '@/components';
import { useFormikContext } from 'formik';
import { FormValues } from '@/pages/CreateEdition/interfaces';

import styles from '@/pages/CreateEdition/styles.module.scss';
import { useMediaQuery } from 'react-responsive';
console.log('useMediaQuery', useMediaQuery);

type PreviewImageProps = {
	isOpen: boolean;
	closeModal: () => void;
	media: string | null;
};

function PreviewImageModal(props: PreviewImageProps) {
	const { isOpen, closeModal, media } = props;
	const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1199.98px)' });

	const close = useCallback(() => {
		closeModal();
	}, [closeModal]);

	if (!media) {
		return null;
	}

	const imageClick = isTabletOrMobile ? close : () => {};

	return (
		<Modal fullSpace isOpen={isOpen} onClose={close} showCloseIcon closeOnOverlayClick isCentered>
			<img src={media} className={styles.previewModal} onClick={imageClick} />
		</Modal>
	);
}

export default PreviewImageModal;
