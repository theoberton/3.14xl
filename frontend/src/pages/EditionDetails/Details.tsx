import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react';
import { Address } from 'ton-core';
import { addressFilter } from '@/helpers';
import { MintDeployModal } from '@/pages/EditionDetails/MintDeployModal';
import { useTime } from '@/hooks';
import { Button, ButtonKinds } from '@/components/Button';

import styles from './styles.module.scss';

import { CollectionData, CollectionContent } from '@/wrappers/types';
import { composeMintTransaction } from '@/pages/EditionDetails/helper';
import MintDateSection from './MintTime';
import { useGetSetState } from 'react-use';

function isMintAllowed(now: Date, start?: number, end?: number) {
	return (!start || new Date(start * 1000) < now) && (!end || now < new Date(end * 1000));
}

function EditionDetails({
	collectionData,
	content,
	currentNextNftItemIndex,
	setCurrentNftItemIndex,
}: {
	setCurrentNftItemIndex: React.Dispatch<React.SetStateAction<number>>;
	currentNextNftItemIndex: number;
	collectionData: CollectionData;
	content: CollectionContent;
}) {
	const now = useTime();
	const [isDeploymentModalOpened, setDeploymentStatus] = useState(false);

	const { collectionAddress } = useParams();
	const address = useTonAddress();
	const [tonConnectUI] = useTonConnectUI();

	const maxSupply = Number(content.maxSupply);
	const isEndOfMinting = collectionData.nextItemIndex == maxSupply && Boolean(maxSupply);

	const handleDeploymentModalClose = useCallback(() => {
		setDeploymentStatus(false);
	}, []);
	const handleDeploymentModalOpen = useCallback(() => {
		setDeploymentStatus(true);
	}, []);

	const mint = useCallback(async () => {
		let newlyConnecteaddress;
		if (!tonConnectUI.connected) {
			try {
				let result = await tonConnectUI.connectWallet();
				newlyConnecteaddress = Address.parseRaw(result.account.address);
			} catch (error) {
				console.error('Error occured when connecting to wallet', error);

				throw error;
			}
		}
		const transactionAccountAddress = !address ? newlyConnecteaddress : Address.parse(address);

		const transaction = composeMintTransaction(collectionData, content, transactionAccountAddress!);

		try {
			const result = await tonConnectUI.sendTransaction(transaction);
			handleDeploymentModalOpen();
			// you can use signed boc to find the transaction
			// const someTxData = await myAppExplorerService.getTransaction(result.boc);
			// alert('Transaction was sent successfully', someTxData);
		} catch (e) {
			console.error(e);
		}
	}, [tonConnectUI.connected, address]);

	const mintButtonHandler = isEndOfMinting ? () => {} : mint;

	return (
		<div className={styles.editionDetailsInfo}>
			{isDeploymentModalOpened && (
				<MintDeployModal
					deploy={mint}
					setCurrentNftItemIndex={setCurrentNftItemIndex}
					currentNextNftItemIndex={currentNextNftItemIndex}
					editionName={content.name}
					address={collectionAddress}
					onClose={handleDeploymentModalClose}
				/>
			)}
			<MintDateSection now={now} content={content} collectionData={collectionData} />
			<div className={styles.editionDetailsInfoPrice}>
				<div className={styles.editionDetailsInfoPriceBlock}>
					<h3>PRICE</h3>
					<span>{content.price} TON</span>
				</div>
				{isMintAllowed(now, content.dateStart, content.dateEnd) && (
					<div className={styles.editionDetailsInfoPriceBlock}>
						<Button
							componentType="button"
							kind={ButtonKinds.basic}
							basicInverted={isEndOfMinting}
							onClick={mintButtonHandler}
						>
							{!isEndOfMinting ? 'Mint' : `No tokens left  ¯\\_(ツ)_/¯`}
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
