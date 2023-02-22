import { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react';

import { addressFilter } from '@/helpers';
import { Button, ButtonKinds } from '@/components/Button';
import styles from './styles.module.scss';

import { CollectionData, CollectionContent } from '@/wrappers/types';
import { composeMintTransaction } from '@/pages/EditionDetails/helper';

function EditionDetails({
	collectionData,
	content,
}: {
	collectionData: CollectionData;
	content: CollectionContent;
}) {
	const { collectionAddress } = useParams();
	const address = useTonAddress();
	const [tonConnectUI] = useTonConnectUI();

	const mint = useCallback(async () => {
		const transaction = composeMintTransaction(collectionData, content, address);

		try {
			const result = await tonConnectUI.sendTransaction(transaction);
			console.log(result);
			// you can use signed boc to find the transaction
			// const someTxData = await myAppExplorerService.getTransaction(result.boc);
			// alert('Transaction was sent successfully', someTxData);
		} catch (e) {
			console.error(e);
		}
	}, []);

	return (
		<div className={styles.editionDetailsInfo}>
			<div className={styles.editionDetailsInfoMintData}>
				{/* <div className={styles.editionDetailsInfoMintDataBlock}>
					<p>MINT ENDS</p>
					<span>10h 45min</span>
				</div> */}
				<div className={styles.editionDetailsInfoMintDataBlock}>
					<p>TOTAL MINTED</p>
					<span>
						{collectionData.nextItemIndex} / {content.maxSupply || '∞'}
					</span>
				</div>
			</div>
			<div className={styles.editionDetailsInfoPrice}>
				<div className={styles.editionDetailsInfoPriceBlock}>
					<h3>PRICE</h3>
					<span>{content.price} TON</span>
				</div>
				<div className={styles.editionDetailsInfoPriceBlock}>
					<Button componentType="button" kind={ButtonKinds.basic} onClick={mint}>
						Mint
					</Button>
				</div>
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
