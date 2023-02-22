import { Button, ButtonKinds } from '@/components';
import styles from '@/pages/CreateCollection/styles.module.scss';

type MenuItemProps = {
	title: string;
	caption: string;
	onClick: () => void;
};

function MenuItem(props: MenuItemProps) {
	const { title, caption, onClick } = props;

	return (
		<div className={styles.collectionMenuItem}>
			<div className={styles.collectionMenuItemContent}>
				<div className={styles.collectionMenuItemTitle}>{title}</div>
				<div className={styles.collectionMenuItemCaption}>{caption}</div>
			</div>
			<div className={styles.collectionMenuButtonWrapper}>
				<Button componentType="button" green kind={ButtonKinds.arrowRight} onClick={onClick} />
			</div>
		</div>
	);
}

export default MenuItem;
