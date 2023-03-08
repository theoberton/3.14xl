import { useCallback, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react';
import { Address } from 'ton-core';
import { addressFilter, isMintAllowed, ManagerFullData } from '@/helpers';
import { MintDeployModal } from '@/pages/EditionDetails/MintDeployModal';
import { useTime } from '@/hooks';
import { Button, ButtonKinds } from '@/components/Button';

import styles from './styles.module.scss';
import { composeMintTransaction } from '@/pages/EditionDetails/helper';
import MintDateSection from './MintTime';
import { CopyToClipboard } from '@/components';

type Props = {
	getEditionDetails: () => void;
	setCurrentNftItemIndex: React.Dispatch<React.SetStateAction<number>>;
	currentNextNftItemIndex: number;
	editionData: ManagerFullData;
};

function EditionDetails({
	editionData: { content, collectionData, managerAddress },
	currentNextNftItemIndex,
	setCurrentNftItemIndex,
	getEditionDetails,
}: Props) {
	const now = useTime();
	const navigate = useNavigate();

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
			await tonConnectUI.sendTransaction(transaction);
			handleDeploymentModalOpen();
		} catch (e) {
			console.error(e);
		}
	}, [tonConnectUI.connected, address]);

	const goToEdititingPage = useCallback(() => {
		navigate(`/edition/${collectionAddress}/edit`);
	}, [collectionAddress]);

	const mintButtonHandler = isEndOfMinting ? () => {} : mint;
	const mintAllowed = isMintAllowed(now, content.dateStart, content.dateEnd);
	const isAuthorized = tonConnectUI.connected;

	const handleConnectWalletClick = useCallback(async () => {
		if (!tonConnectUI.connected) {
			try {
				await tonConnectUI.connectWallet();
			} catch (error) {
				console.error('Error occured when connecting to wallet', error);

				throw error;
			}
		}
	}, [tonConnectUI.connected]);

	let loginWalletAddress;

	if (address) {
		const addresFriendly = Address.parseFriendly(address);

		loginWalletAddress = addresFriendly.address.toString();
	}
	const isMyEdition = managerAddress.toString() === loginWalletAddress;

	return (
		<div className={styles.editionDetailsInfo}>
			{isDeploymentModalOpened && (
				<MintDeployModal
					deploy={mint}
					getEditionDetails={getEditionDetails}
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
				{mintAllowed && isAuthorized && (
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
				{mintAllowed && !isAuthorized && (
					<div className={styles.editionDetailsInfoPriceBlock}>
						<Button
							componentType="button"
							kind={ButtonKinds.basic}
							basicInverted={isEndOfMinting}
							onClick={handleConnectWalletClick}
						>
							Connect wallet
						</Button>
					</div>
				)}
			</div>
			<div className={styles.editionDetailsInfoAboutWrapper}>
				<div className={styles.editionDetailsInfoAbout}>
					<h3>ABOUT</h3>
					<h1>{content.name}</h1>
					<p>{content.description}</p>
				</div>
				{isMyEdition && (
					<div className={styles.editionDetailsInfoAboutEdit}>
						<Button
							componentType="button"
							basicInverted
							kind={ButtonKinds.basic}
							onClick={goToEdititingPage}
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
					<CopyToClipboard
						textValue={collectionAddress!}
						message="Contract address has been copied!"
					>
						<span>{addressFilter(collectionAddress!)}</span>
					</CopyToClipboard>
				</div>
				<div>
					<p>Symbol</p>
					<CopyToClipboard textValue={collectionAddress!} message="Edition symbol has been copied!">
						<span>{content.symbol}</span>
					</CopyToClipboard>
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
