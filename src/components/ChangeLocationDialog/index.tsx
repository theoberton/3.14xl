import { Modal } from 'react-responsive-modal';

import { Button, ButtonKinds } from '@/components/Button';

interface DialogBoxProps {
	showDialog: boolean;
	cancelNavigation: any;
	confirmNavigation: any;
}

export function ChangeLocationDialog({
	showDialog,
	cancelNavigation,
	confirmNavigation,
}: DialogBoxProps) {
	return (
		<Modal open={showDialog} showCloseIcon onClose={close} closeOnOverlayClick center>
			<div>This page has unsaved changes</div>
			<div>Are you sure you want to leave the page? All changes will be discarded.</div>
			<div>
				<Button componentType="button" onClick={cancelNavigation} kind={ButtonKinds.basic}>
					Continue editing
				</Button>
				<Button componentType="button" onClick={confirmNavigation} kind={ButtonKinds.basic}>
					Leave page
				</Button>
			</div>
			{/* <img src={media} className={styles.previewModal} /> */}
		</Modal>
	);
}
