import { Modal } from '@/components';
import { useTonClient } from '@/hooks';
import { useEffect, useState, useCallback } from 'react';
import { Address } from 'ton-core';
import { NftCollection } from '@/wrappers';
import { useAsyncRetry } from 'react-use';
import { Loader } from '@/components';
import { Button, ButtonKinds } from '@/components/Button';

import { LoaderSizes, LoaderColors, LoaderTypes } from '@/components/interfaces';
import { useNavigate } from 'react-router';
import styles from '@/pages/CreateEdition/styles.module.scss';

import SuccessIcon from '@/assets/images/svg/common/success.svg';
import FailureIcon from '@/assets/images/svg/common/failure.svg';

const renderDeployInProgressComponent = () => (
	<div className={styles.deploymentModal}>
		<div className={styles.deploymentModalTitle}>
			Minting your NFT
			<div className={styles.deploymentModalSpinner}>
				<Loader type={LoaderTypes.pulse} size={LoaderSizes.mini} color={LoaderColors.white} />
			</div>
		</div>
		<div className={styles.deploymentModalTitleCaption}>It usually takes about 15 seconds</div>
	</div>
);

const renderDeploySuccessComponent = (onClose: () => void, editionName: string | null) => (
	<div className={styles.deploymentModal}>
		<img src={SuccessIcon} className={styles.deploymentModalImage} />
		<div className={styles.deploymentModalTitle}>Your {editionName} NFT has been minted!</div>
		<div className={styles.deploymentModalActions}>
			<Button componentType="button" kind={ButtonKinds.basic} onClick={onClose}>
				Ok
			</Button>
		</div>
	</div>
);

const renderDeployFailureComponent = (goBack: () => void, retryCreateEdition: () => void) => (
	<div className={styles.deploymentModal}>
		<img src={FailureIcon} className={styles.deploymentModalImage} />
		<div className={styles.deploymentModalTitle}>Something went wrong</div>
		<div className={styles.deploymentModalTitleCaption}>
			NFT hasn't been minted, an error occurred
		</div>
		<div className={styles.deploymentModalActions}>
			<Button componentType="button" kind={ButtonKinds.basic} basicInverted onClick={goBack}>
				Go back
			</Button>
			<Button componentType="button" kind={ButtonKinds.basic} onClick={retryCreateEdition}>
				Retry
			</Button>
		</div>
	</div>
);

enum DeploymentStatus {
	inProgress = 'inProgress',
	success = 'success',
	failiure = 'failiure',
}

type Props = {
	onClose: () => void;
	address: string | undefined;
	deploy: () => void;
	editionName: string | null;
	currentNextNftItemIndex: number;
	setCurrentNftItemIndex: React.Dispatch<React.SetStateAction<number>>;
};

const deployExpirationTime = 40 * 1000; // 40 seconds
const retryContractDeployedCheck = 2 * 1000; // every 2 seconds check whether contract is deployed or not

export function MintDeployModal({
	address,
	onClose,
	deploy,
	currentNextNftItemIndex,
	setCurrentNftItemIndex,
	editionName,
}: Props) {
	const [status, setStatus] = useState(DeploymentStatus.inProgress);
	let retryTimeoutId: ReturnType<typeof setTimeout>;
	const tonClient = useTonClient();

	useEffect(() => {
		const failiureTimeoutId = setTimeout(() => {
			clearTimeout(retryTimeoutId);

			if (status !== DeploymentStatus.success) {
				setStatus(DeploymentStatus.failiure);
			}
		}, deployExpirationTime);

		return () => {
			clearTimeout(failiureTimeoutId);
		};
	}, [status]);

	const collectionDataAsync = useAsyncRetry(async () => {
		if (!address || !tonClient || status == DeploymentStatus.failiure) {
			return null;
		}

		const nftCollection = NftCollection.createFromAddress(Address.parse(address));
		const nftColelctionContract = tonClient.open(nftCollection);
		let collectionData;
		try {
			collectionData = await nftColelctionContract.getCollectionData();
			if (collectionData.nextItemIndex === currentNextNftItemIndex) {
				throw new Error();
			}
			setStatus(DeploymentStatus.success);
		} catch (error) {
			setStatus(DeploymentStatus.inProgress);
			throw error;
		}

		return { collectionData };
	}, [tonClient, address, currentNextNftItemIndex]);

	const retryMint = useCallback(() => {
		setStatus(DeploymentStatus.inProgress);
		onClose();
		deploy();
	}, []);

	const goBack = useCallback(() => {
		if (collectionDataAsync.value) {
			setCurrentNftItemIndex(collectionDataAsync.value.collectionData.nextItemIndex);
		}

		// onClose();
	}, [collectionDataAsync.value]);

	useEffect(() => {
		if (collectionDataAsync.value?.collectionData) {
			setStatus(DeploymentStatus.success);
		} else if (collectionDataAsync.error && status == DeploymentStatus.inProgress) {
			retryTimeoutId = setTimeout(collectionDataAsync.retry, retryContractDeployedCheck);
		}

		return () => {
			if (collectionDataAsync.value?.collectionData) {
				clearTimeout(retryTimeoutId);
			}
		};
	}, [collectionDataAsync.value, collectionDataAsync.error, status]);

	const closeOnOverlayClick = status !== DeploymentStatus.inProgress;

	return (
		<Modal
			closeOnOverlayClick={closeOnOverlayClick}
			isCentered
			isOpen
			showCloseIcon={false}
			onClose={onClose}
		>
			{status == DeploymentStatus.success && renderDeploySuccessComponent(goBack, editionName)}
			{status == DeploymentStatus.inProgress && renderDeployInProgressComponent()}
			{status == DeploymentStatus.failiure && renderDeployFailureComponent(goBack, retryMint)}
		</Modal>
	);
}
