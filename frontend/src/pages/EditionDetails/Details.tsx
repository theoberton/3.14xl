import { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react';
import { Address } from 'ton-core';
import { addressFilter } from '@/helpers';
import { useTime } from '@/hooks';
import { Button, ButtonKinds } from '@/components/Button';

import styles from './styles.module.scss';

import { CollectionData, CollectionContent } from '@/wrappers/types';
import { composeMintTransaction } from '@/pages/EditionDetails/helper';
import MintDateSection from './MintTime';

function isMintAllowed(now: Date, start?: number, end?: number) {
	return (!start || new Date(start * 1000) < now) && (!end || now < new Date(end * 1000));
}

function EditionDetails({
	collectionData,
	content,
}: {
	collectionData: CollectionData;
	content: CollectionContent;
}) {
	const now = useTime();
	const { collectionAddress } = useParams();
	const address = useTonAddress();
	const [tonConnectUI] = useTonConnectUI();

	const mint = useCallback(async () => {
		const transaction = composeMintTransaction(collectionData, content, Address.parse(address));

		try {
			const result = await tonConnectUI.sendTransaction(transaction);
			// you can use signed boc to find the transaction
			// const someTxData = await myAppExplorerService.getTransaction(result.boc);
			// alert('Transaction was sent successfully', someTxData);
		} catch (e) {
			console.error(e);
		}
	}, []);	 

	const maxSupply = Number(content.maxSupply);
	const isEndOfMinting = collectionData.nextItemIndex == maxSupply && Boolean(maxSupply);

	return (
		<div className={styles.editionDetailsInfo}>
			<MintDateSection now={now} content={content} collectionData={collectionData} />
			<div className={styles.editionDetailsInfoPrice}>
				<div className={styles.editionDetailsInfoPriceBlock}>
					<h3>PRICE</h3>
					<span>{content.price} TON</span>
				</div>
				{isMintAllowed(now, content.dateStart, content.dateEnd) && (
					<div className={styles.editionDetailsInfoPriceBlock}>
						<Button componentType="button" kind={ButtonKinds.basic} basicInverted={isEndOfMinting} onClick={mint}>
							{!isEndOfMinting ? "Mint" : `No tokens left  ¯\\_(ツ)_/¯`}
						</Button>
					</div>
				)}
			</div>
			<div className={styles.editionDetailsInfoAbout}>
				<h3>ABOUT</h3>
				<h1>{content.name}</h1>
				<p>{content.description}</p>
			</div>
			<div className={styles.editionDetailsInfoData}>
				<h3>DETAILS</h3>
				<div>
					<p>Contract Address</p>
					<span>{addressFilter(collectionAddress!)}</span>
				</div>
				<div>
					<p>Symbol</p>
					<span>{content.symbol}</span>
				</div>
				<div>
					<p>Blockchain</p>
					<span>TON</span>
				</div>
				<div>
					<p>IPFS</p>
					<a href={content.image} target="_blank">
						→
					</a>
				</div>
				<div>
					<p>IPFS Metadata</p>
					<a href={collectionData.collectionContentUri} target="_blank">
						→
					</a>
				</div>
			</div>
		</div>
	);
}

export default EditionDetails;
