import { IExampleItem } from './data';
import EditionStatus from './EditionStatus/EditionStatus';

import styles from './styles.module.scss';

interface IProps {
	edition: IExampleItem;
}

function EditionItem({ edition }: IProps) {
	const { name, minter, img, isActive, limit, minted, price } = edition;

	return (
		<div className={styles.editionsItem}>
			<div className={styles.editionsItemHeader}>
				<p>{minter}</p>
				<EditionStatus isActive={isActive} />
			</div>
			<div className={styles.editionsItemPreview}>
				<img src={img} />
			</div>
			<h3>{name}</h3>
			<div className={styles.editionsItemInfo}>
				<p>{price === 0 ? 'Free' : `${price} TON`}</p>
				<p>{limit ? `${minted}/${limit}` : `${minted}/∞`}</p>
			</div>
		</div>
	);
}

export default EditionItem;
