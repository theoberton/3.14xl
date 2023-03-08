import { Link } from 'react-router-dom';
import { IEditionExampleItem } from './interface';
import EditionStatus from './EditionStatus/EditionStatus';
import { addressFilter } from '@/helpers';
import styles from './styles.module.scss';

interface IProps {
	edition: IEditionExampleItem;
}

export function EditionCard({ edition }: IProps) {
	const { name, minter, img, isActive, limit, minted, price, collectionAddress } = edition;

	const Card = (
		<div
			className={styles.editionCard}
			onClick={() => {
				if (!collectionAddress) return alert('This is a fake item 😋');
			}}
		>
			<div className={styles.editionCardHeader}>
				<p>by {addressFilter(minter)}</p>
				<EditionStatus isActive={isActive} />
			</div>
			<div className={styles.editionCardPreview}>
				<img src={img} />
			</div>
			<div>
				<h3>{name}</h3>
				<div className={styles.editionCardInfo}>
					<p>{price === 0 ? 'Free' : `${price} TON`}</p>
					<p>{limit ? `${minted}/${limit}` : `${minted}/∞`}</p>
				</div>
			</div>
		</div>
	);

	return collectionAddress ? <Link to={`/edition/${collectionAddress}`}>{Card}</Link> : Card;
}
