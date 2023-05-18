import { Modal } from '@/components';
import { useCallback, useEffect } from 'react';
import QRCode from 'react-qr-code';

type FastMintProps = {
	isOpen: boolean;
	closeModal: () => void;
	value: string;
};

export function FastMintModal(props: FastMintProps) {
	const { isOpen, closeModal, value } = props;

	const close = useCallback(() => {
		closeModal();
	}, [closeModal]);

	return (
		<Modal fullSpace isOpen={isOpen} onClose={close} showCloseIcon closeOnOverlayClick isCentered>
			<QRCode
				size={256}
				style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
				value={value}
				viewBox={`0 0 256 256`}
			/>
		</Modal>
	);
}
