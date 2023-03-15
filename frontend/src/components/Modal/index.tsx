import { Modal as ReactModal } from 'react-responsive-modal';
import styles from '@/components/Modal/styles.module.scss';

export type ModalProps = {
	isOpen: boolean;
	isCentered?: boolean;
	showCloseIcon?: boolean;
	closeOnOverlayClick?: boolean;
	onOverlayClick?: () => void;
	fullSpace?: boolean;
	children?: React.ReactNode;
	onClose: () => void;
};

export function Modal(props: ModalProps) {
	const {
		isOpen,
		fullSpace,
		isCentered = false,
		children,
		showCloseIcon,
		closeOnOverlayClick,
		onOverlayClick,
		onClose,
	} = props;

	const modalClassnames = {
		modal: !fullSpace ? styles.modalModal : styles.modalModalFullSpace,
		closeButton: styles.modalButton,
		closeIcon: styles.modalButtonIcon,
		overlay: styles.modalOverlay,
	};

	return (
		<ReactModal
			onOverlayClick={onOverlayClick}
			closeOnOverlayClick={closeOnOverlayClick}
			classNames={modalClassnames}
			open={isOpen}
			center={isCentered}
			showCloseIcon={showCloseIcon}
			onClose={onClose}
		>
			{children}
		</ReactModal>
	);
}
