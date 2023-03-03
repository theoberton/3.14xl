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
	<div className={styles.deploymentModalTitle}>
		Edition owner is being updated
		<div className={styles.deploymentModalSpinner}>
			<Loader type={LoaderTypes.pulse} size={LoaderSizes.mini} color={LoaderColors.white} />
		</div>
	</div>
);

const renderDeploySuccessComponent = (goBack: () => void, editionName: string | null) => (
	<div className={styles.deploymentModal}>
		<img src={SuccessIcon} className={styles.deploymentModalImage} />
		<div className={styles.deploymentModalTitle}>{editionName}'s owner has been updated</div>
		<div className={styles.deploymentModalActions}>
			<Button basicInverted componentType="button" kind={ButtonKinds.basic} onClick={goBack}>
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
			Edition owner hasn't been updated, an error occurred while trying to deploy
		</div>
		<div className={styles.deploymentModalActions}>
			<Button componentType="button" kind={ButtonKinds.basic} onClick={goBack}>
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
	address: string | null;
	deploy: () => void;
	editionName: string | null;
};

const deployExpirationTime = 40 * 1000; // 40 seconds
const retryContractDeployedCheck = 2 * 1000; // every 2 seconds check whether contract is deployed or not

export function DeploymentModal({ address, onClose, deploy, editionName }: Props) {
	const navigate = useNavigate();
	const [status, setStatus] = useState(DeploymentStatus.inProgress);
	let retryTimeoutId: ReturnType<typeof setTimeout>;
	const tonClient = useTonClient();
	// const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1199.98px)' });

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
			setStatus(DeploymentStatus.success);
		} catch (error) {
			setStatus(DeploymentStatus.inProgress);
			throw error;
		}

		return { collectionData };
	}, [tonClient, address]);

	const retry = useCallback(() => {
		setStatus(DeploymentStatus.inProgress);
		onClose();
		deploy();
	}, []);

	const goBack = useCallback(() => {
		onClose();
	}, []);

	useEffect(() => {
		if (collectionDataAsync.value?.collectionData &&) {
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

	const onOverlayClick = useCallback(() => {
		if (status == DeploymentStatus.success) {
			// createNewEditionHandler();
		}
	}, [status]);

	const closeOnOverlayClick = status !== DeploymentStatus.inProgress;

	return (
		<Modal
			closeOnOverlayClick={closeOnOverlayClick}
			onOverlayClick={onOverlayClick}
			isCentered
			isOpen
			showCloseIcon={false}
			onClose={onClose}
		>
			{status == DeploymentStatus.success && renderDeploySuccessComponent(goBack, editionName)}
			{status == DeploymentStatus.inProgress && renderDeployInProgressComponent()}
			{status == DeploymentStatus.failiure && renderDeployFailureComponent(goBack, retry)}
		</Modal>
	);
}
