import { useNavigate } from 'react-router-dom';
import { IEditionExampleItem } from './interface';
import EditionStatus from './EditionStatus/EditionStatus';
import { addressFilter } from '@/helpers';
import styles from './styles.module.scss';

interface IProps {
	edition: IEditionExampleItem;
}

export function EditionCard({ edition }: IProps) {
	const navigate = useNavigate();
	const { name, minter, img, isActive, limit, minted, price, collectionAddress } = edition;

	return (
		<div
			className={styles.editionCard}
			onClick={() => {
				if (!collectionAddress) return alert('This is fake item 😋');
				navigate(`/edition/${collectionAddress}`);
			}}
		>
			<div className={styles.editionCardHeader}>
				<p>by {addressFilter(minter)}</p>
				<EditionStatus isActive={isActive} />
			</div>
			<div className={styles.editionCardPreview}>
				<img src={img} />
			</div>
			<h3>{name}</h3>
			<div className={styles.editionCardInfo}>
				<p>{price === 0 ? 'Free' : `${price} TON`}</p>
				<p>{limit ? `${minted}/${limit}` : `${minted}/∞`}</p>
			</div>
		</div>
	);
}
