import { Link } from 'react-router-dom';
import { IEditionItem } from './interface';
import { CopyToClipboard } from '@/components';
import EditionStatus from './EditionStatus/EditionStatus';
import { addressFilter } from '@/helpers';
import styles from './styles.module.scss';

interface IProps {
	edition: IEditionItem;
}

export function EditionCard({ edition }: IProps) {
	const { name, owner, content, dateStart, dateEnd, limit, minted, price, collectionAddress } =
		edition;

	const Card = (
		<div className={styles.editionCard}>
			<div className={styles.editionCardHeader}>
				<CopyToClipboard textValue={owner} message="Owner address has been copied!">
					<p>by {addressFilter(owner)}</p>
				</CopyToClipboard>
				<EditionStatus dateStart={dateStart} dateEnd={dateEnd} />
			</div>
			<div className={styles.editionCardPreview}>
				<img src={content} />
			</div>
			<div>
				<h3>{name}</h3>
				<div className={styles.editionCardInfo}>
					<p>{price === '0' ? 'Free' : `${price} TON`}</p>
					{minted !== null && <p>{limit ? `${minted}/${limit}` : `${minted}/∞`}</p>}
				</div>
			</div>
		</div>
	);

	return collectionAddress ? <Link to={`/edition/${collectionAddress}`}>{Card}</Link> : Card;
}
