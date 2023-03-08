import { useCallback, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
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
import { CopyToClipboard } from '@/components';
import { EditionData } from '../EditionEdit/interfaces';

function isMintAllowed(now: Date, start?: number, end?: number) {
	return (!start || new Date(start * 1000) < now) && (!end || now < new Date(end * 1000));
}

function EditionDetails({
	editionData: { content, collectionData, managerAddress },
	currentNextNftItemIndex,
	setCurrentNftItemIndex,
}: {
	setCurrentNftItemIndex: React.Dispatch<React.SetStateAction<number>>;
	currentNextNftItemIndex: number;
	editionData: EditionData;
}) {
	const now = useTime();
	const navigate = useNavigate();
	const location = useLocation();

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

	const goToEdititingPage = useCallback(() => {
		let editPage = `${location.pathname}edit`;
		if (location.pathname[location.pathname.length - 1] !== '/') {
			editPage = `${editPage}/`;
		}

		navigate(editPage);
	}, [location.pathname]);

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
	const addresFriendly = Address.parseFriendly(address);

	const loginWalletAddress = addresFriendly.address.toString();

	const isMyEdition = managerAddress.toString() === loginWalletAddress;

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
				{mintAllowed && isAuthorized && (
					<div className={styles.editionDetailsInfoPriceBlock}>
						{!isEndOfMinting ? (
							<Button
								componentType="button"
								kind={ButtonKinds.basic}
								basicInverted={isEndOfMinting}
								onClick={mintButtonHandler}
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
