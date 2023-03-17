import ShareIcon from '@/assets/images/svg/common/share.svg';
import { Modal, SharePanel } from '@/components';
import styles from './styles.module.scss';

export function ShareButton() {
	return (
		<div className={styles.shareButtonContainer}>
			<img src={ShareIcon} />
		</div>
	);
}
