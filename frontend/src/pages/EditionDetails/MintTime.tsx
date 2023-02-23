import { mintDateFilter } from '@/helpers';
import {  CollectionContent, CollectionData } from '@/wrappers/types';
import styles from './styles.module.scss';

function MintDate({
	collectionData,
	content,
	now,
}: {
	collectionData: CollectionData;
	content: CollectionContent;
	now: Date
}) {

  return (
    <div className={styles.editionDetailsInfoMintDate}>
				<Block {...getFirstBlockProps(collectionData, content, now)}/>
				<Block {...getSecondBlockProps(content, now)}/>
			</div>
  )
}

function Block({ text, label }: { label: string; text: string }) {
	return 	(
		<div className={styles.editionDetailsInfoMintDateBlock}>
			<p>{label.toUpperCase()}</p>
			<span>{text}</span>
		</div>
	)
}

function getFirstBlockProps(collectionData: CollectionData, content: CollectionContent, now: Date) {
	const dateStart = new Date(content.dateStart ?? 0 * 1000);

	if (dateStart < now) {
		return {
			label: 'total minted',
			text: `${collectionData.nextItemIndex} / ${Number(content.maxSupply) || '∞'}`
		}
	}

	return {
		label: 'mint starts',
		text: mintDateFilter(dateStart),
	}
}

function getSecondBlockProps(content: CollectionContent, now: Date) {
	if (!content.dateEnd) {
		return {
			label: 'mint ends',
			text: '∞'
		}
	}

	const dateEnd = new Date(content.dateEnd * 1000);

	if (now < dateEnd) {
		return {
			label: 'mint ends',
			text: mintDateFilter(dateEnd),
		}
	}

	return {
		label: 'mint ended',
		text: mintDateFilter(dateEnd),
	}
}

export default MintDate;