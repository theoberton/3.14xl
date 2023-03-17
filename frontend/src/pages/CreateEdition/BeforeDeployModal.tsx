import styles from './styles.module.scss';
import { Button, ButtonKinds, Modal, ModalProps } from '@/components';

export function BeforeDeployModal({
	deploy,
	...rest
}: {
	deploy: () => Promise<void>;
} & ModalProps) {
	return (
		<Modal isCentered showCloseIcon={false} {...rest}>
			<div className={styles.deploymentModal}>
				<div className={styles.deploymentModalTitle}>Ready to deploy contract!</div>
				<div className={styles.deploymentModalActions}>
					<Button componentType="button" kind={ButtonKinds.basic} onClick={deploy}>
						Go to tonkeeper
					</Button>
				</div>
			</div>
		</Modal>
	);
}
