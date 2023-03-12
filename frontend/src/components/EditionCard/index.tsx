import { Link } from 'react-router-dom';
import { IEditionItem } from './interface';
import EditionStatus from './EditionStatus/EditionStatus';
import styles from './styles.module.scss';

interface IProps {
	edition: IEditionItem;
}

export function EditionCard({ edition }: IProps) {
	const { name, content, dateStart, dateEnd, limit, minted, price, collectionAddress } =
		edition;

	const Card = (
		<div className={styles.editionCard}>
			<div className={styles.editionCardHeader}>
				<h3>{name}</h3>
				<EditionStatus dateStart={dateStart} dateEnd={dateEnd} />
			</div>
			<div className={styles.editionCardPreview}>
				<img src={content} />
			</div>
			<div>
				<div className={styles.editionCardInfo}>
					<p>{price === '0' ? 'Free' : `${price} TON`}</p>
					<p>{minted ?? 0} / {limit || '∞'}</p>
				</div>
			</div>
		</div>
	);

	return collectionAddress ? <Link to={`/edition/${collectionAddress}`}>{Card}</Link> : Card;
}
