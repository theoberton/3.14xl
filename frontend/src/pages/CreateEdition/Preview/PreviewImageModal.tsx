import { useCallback } from 'react';
import { Modal } from '@/components';
import { useFormikContext } from 'formik';
import { FormValues } from '@/pages/CreateEdition/interfaces';

import styles from '@/pages/CreateEdition/styles.module.scss';

type PreviewImageProps = {
	isOpen: boolean;
	closeModal: () => void;
	media: string | null;
};

function PreviewImageModal(props: PreviewImageProps) {
	const { isOpen, closeModal, media } = props;

	const close = useCallback(() => {
		closeModal();
	}, [closeModal]);

	if(!media) {
		return null;
	}

	return (
		<Modal fullSpace isOpen={isOpen} onClose={close} showCloseIcon closeOnOverlayClick isCentered>
			<img src={media} className={styles.previewModal} />
		</Modal>
	);
}

export default PreviewImageModal;
