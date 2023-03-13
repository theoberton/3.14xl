import { useCallback, useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import InfoIcon from '@/assets/images/svg/common/info.svg';

import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react';
import { Address } from 'ton-core';
import { isMintAllowed, ManagerFullData, priceFilter } from '@/helpers';
import { MintDeployModal } from '@/pages/EditionDetails/MintDeployModal';
import { useNavigateHandler, useTime } from '@/hooks';
import { Button, ButtonKinds } from '@/components/Button';

import styles from './styles.module.scss';
import { composeMintTransaction } from '@/pages/EditionDetails/helper';
import MintDateSection from './MintTime';
import { AddressLabel } from '@/components';

type Props = {
	getEditionDetails: () => void;
	setCurrentNftItemIndex: React.Dispatch<React.SetStateAction<number>>;
	currentNextNftItemIndex: number;
	editionData: ManagerFullData;
};

// @todo: refactor this func
function EditionDetails({
	editionData: { content, collectionData, managerAddress },
	currentNextNftItemIndex,
	setCurrentNftItemIndex,
	getEditionDetails,
}: Props) {
	const now = useTime();

	const [isDeploymentModalOpened, setDeploymentStatus] = useState(false);

	const tonConnectAddress = useTonAddress();
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
		let transactionAccountAddress = tonConnectAddress && Address.parse(tonConnectAddress);

		if (!transactionAccountAddress) {
			try {
				const result = await tonConnectUI.connectWallet();

				transactionAccountAddress = Address.parseRaw(result.account.address);
			} catch (error) {
				console.error('Error occured when connecting to wallet', error);

				throw error;
			}
		}

		const transaction = composeMintTransaction(collectionData, content, transactionAccountAddress!);

		try {
			await tonConnectUI.sendTransaction(transaction);
			handleDeploymentModalOpen();
		} catch (e) {
			console.error(e);
		}
	}, [handleDeploymentModalOpen, tonConnectUI, tonConnectAddress]);

	const goToEditionEdit = useNavigateHandler(`/edition/${collectionData.address}/edit`);

	const mintAllowed = isMintAllowed(now, content.dateStart, content.dateEnd);
	const isMyEdition: boolean = Boolean(tonConnectAddress) && managerAddress.toString() === Address.parse(tonConnectAddress).toString();

	return (
		<div className={styles.editionDetailsInfo}>
			{isDeploymentModalOpened && (
				<MintDeployModal
					deploy={mint}
					getEditionDetails={getEditionDetails}
					setCurrentNftItemIndex={setCurrentNftItemIndex}
					currentNextNftItemIndex={currentNextNftItemIndex}
					editionName={content.name}
					address={collectionData.address}
					onClose={handleDeploymentModalClose}
				/>
			)}
			<MintDateSection now={now} content={content} collectionData={collectionData} />
			<div className={styles.editionDetailsInfoPrice}>
				<div className={styles.editionDetailsInfoPriceBlock}>
					<h3>PRICE</h3>
					<div style={{ display: 'flex', alignItems:'center', gap: '4px'}}>
						<span>{priceFilter(content.price)}</span>
						<Tooltip title="Plus 1 TON to cover blockchain fees. Unspent amount will be returned">
							<img src={InfoIcon} />
						</Tooltip>
					</div>
				</div>
				{mintAllowed && (
					<div className={styles.editionDetailsInfoPriceBlock}>
						{!isEndOfMinting ? (
							<Button
								componentType="button"
								kind={ButtonKinds.basic}
								basicInverted={isEndOfMinting}
								onClick={mint}
							>
								Mint
							</Button>
						) : (
							<div className={styles.editionDetailsInfoPriceBlockEmpty}>
								No tokens left ¯\\_(ツ)_/¯{' '}
							</div>
						)}
					</div>
				)}
			</div>
			<div className={styles.editionDetailsInfoAboutWrapper}>
				<div className={styles.editionDetailsInfoAbout}>
					<h3>ABOUT</h3>
					<div className={styles.editionDetailsInfoAboutName}>
						<h1>{content.name}</h1>
					</div>
					<p>{content.description}</p>
				</div>
				{isMyEdition && (
					<div className={styles.editionDetailsInfoAboutEdit}>
						<Button
							componentType="button"
							basicInverted
							kind={ButtonKinds.basic}
							onClick={goToEditionEdit}
						>
							Edit
						</Button>
					</div>
				)}
			</div>
			<div className={styles.editionDetailsInfoData}>
				<h3>DETAILS</h3>
				<div>
					<p>Contract Address</p>
					<AddressLabel address={collectionData.address} withIcon={false} />
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
