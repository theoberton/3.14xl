import { useNavigate } from 'react-router-dom';
import { IExampleItem } from './data';
import EditionStatus from './EditionStatus/EditionStatus';
import { addressFilter } from '@/helpers';
import styles from './styles.module.scss';

interface IProps {
	edition: IExampleItem;
}

function EditionItem({ edition }: IProps) {
	const navigate = useNavigate();
	const { name, minter, img, isActive, limit, minted, price, collectionAddress } = edition;

	return (
		<div className={styles.editionsItem} onClick={() => {
			if (!collectionAddress) return alert('This is fake item 😋');
			navigate(`/edition/${collectionAddress}`)
		}}>
			<div className={styles.editionsItemHeader}>
				<p>by {addressFilter(minter)}</p>
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
