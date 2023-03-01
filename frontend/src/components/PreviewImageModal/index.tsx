import { useCallback } from 'react';
import { Modal } from '@/components';

import styles from '@/components/PreviewImageModal/styles.module.scss';

type PreviewImageProps = {
	isOpen: boolean;
	closeModal: () => void;
	media: string | null;
};

export function PreviewImageModal(props: PreviewImageProps) {
	const { isOpen, closeModal, media } = props;

	const close = useCallback(() => {
		closeModal();
	}, [closeModal]);

	if (!media) {
		return null;
	}

	return (
		<Modal fullSpace isOpen={isOpen} onClose={close} showCloseIcon closeOnOverlayClick isCentered>
			<img src={media} className={styles.previewModal} />
		</Modal>
	);
}
