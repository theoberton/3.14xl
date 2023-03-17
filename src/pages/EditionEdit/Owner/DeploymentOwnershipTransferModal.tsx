import { Modal } from '@/components';
import { useTonClient } from '@/hooks';
import { useEffect, useState, useCallback, useContext } from 'react';
import { Address } from 'ton-core';
import { NftCollection, NftManager } from '@/wrappers';
import { useAsyncRetry } from 'react-use';
import { Loader } from '@/components';
import { Button, ButtonKinds } from '@/components/Button';
import { LoaderSizes, LoaderColors, LoaderTypes } from '@/components/interfaces';
import { updateManagerContracts } from '@/libs/apiClient';

import { convertToBounceableAddress, getFullNftCollectionData } from '@/helpers';

import { DeploymentContext } from '@/pages/EditionEdit/deploymentContext';

import styles from '@/pages/CreateEdition/styles.module.scss';

import SuccessIcon from '@/assets/images/svg/common/success.svg';
import FailureIcon from '@/assets/images/svg/common/failure.svg';
import { TransferOwnershiptValues } from '../interfaces';

const renderDeployInProgressComponent = () => (
	<div className={styles.deploymentModal}>
		<div className={styles.deploymentModalTitle}>
			Edition owner is being updated
			<div className={styles.deploymentModalSpinner}>
				<Loader type={LoaderTypes.pulse} size={LoaderSizes.mini} color={LoaderColors.white} />
			</div>
		</div>
		<div className={styles.deploymentModalTitleCaption}>It usually takes about 15 seconds</div>
	</div>
);

const renderDeploySuccessComponent = (goBack: () => void, editionName: string | null) => (
	<div className={styles.deploymentModal}>
		<img src={SuccessIcon} className={styles.deploymentModalImage} />
		<div className={styles.deploymentModalTitle}>{editionName}'s owner has been updated</div>
		<div className={styles.deploymentModalActions}>
			<Button componentType="button" kind={ButtonKinds.basic} onClick={goBack}>
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
			Edition owner hasn't been updated, an error occurred while trying to update
		</div>
		<div className={styles.deploymentModalActions}>
			<Button componentType="button" basicInverted kind={ButtonKinds.basic} onClick={goBack}>
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
	values: TransferOwnershiptValues;
	address: string | null;
	deploy: () => void;
	handleDeploymentSuccessModalClose: () => void;
};

const deployExpirationTime = 40 * 1000; // 40 seconds
const retryContractDeployedCheck = 2 * 1000; // every 2 seconds check whether contract is deployed or not

export function DeploymentModal({
	address,
	deploy,
	values,
	handleDeploymentSuccessModalClose,
}: Props) {
	const [status, setStatus] = useState(DeploymentStatus.inProgress);
	const { ownerDeploymentState, setOwnerDeploymentState, editionName } =
		useContext(DeploymentContext);

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
		let managerData;
		try {
			const collectionData = await nftColelctionContract.getCollectionData();

			const nftManager = NftManager.createFromAddress(collectionData.ownerAddress);
			const nftManagerContract = tonClient.open(nftManager);

			managerData = await nftManagerContract.getManagerData();
		} catch (error) {
			setStatus(DeploymentStatus.inProgress);
			throw error;
		}

		return { collectionData, managerAddress: managerData.owner };
	}, [tonClient, address]);

	const retry = useCallback(() => {
		setStatus(DeploymentStatus.inProgress);
		setOwnerDeploymentState({
			isModalOpened: false,
		});

		deploy();
	}, []);

	const goBackSuccess = useCallback(() => {
		setOwnerDeploymentState({
			isModalOpened: false,
		});
		handleDeploymentSuccessModalClose();
	}, [ownerDeploymentState, handleDeploymentSuccessModalClose]);

	const goBackFailiure = useCallback(() => {
		setOwnerDeploymentState({
			isModalOpened: false,
		});
	}, []);

	const updateOwner = useCallback(async () => {
		if (!tonClient || !address) return;

		const data = await getFullNftCollectionData(tonClient, address);

		try {
			await updateManagerContracts(data.collectionData.ownerAddress, {
				ownerAddress: data.managerAddress,
			}).catch(err => console.log(err));
		} catch (error) {
			console.log('error', error);
		}
	}, [tonClient, address]);

	useEffect(() => {
		if (collectionDataAsync.value && tonClient) {
			const exitingOwnerValue = collectionDataAsync.value.managerAddress.toString();
			const bounceableOnwerAddress = convertToBounceableAddress(exitingOwnerValue);
			const formManagerAddress = convertToBounceableAddress(values.managerAddress);

			if (bounceableOnwerAddress === formManagerAddress) {
				setStatus(DeploymentStatus.success);
				updateOwner();
			} else {
				retryTimeoutId = setTimeout(collectionDataAsync.retry, retryContractDeployedCheck);
			}
		}
		return () => {
			if (collectionDataAsync.value?.managerAddress) {
				clearTimeout(retryTimeoutId);
			}
		};
	}, [
		address,
		tonClient,
		values,
		collectionDataAsync.value?.managerAddress,
		collectionDataAsync.error,
		status,
	]);

	const closeOnOverlayClick = status !== DeploymentStatus.inProgress;

	return (
		<Modal
			closeOnOverlayClick={closeOnOverlayClick}
			onOverlayClick={goBackFailiure}
			isCentered
			isOpen
			showCloseIcon={false}
			onClose={goBackFailiure}
		>
			{status == DeploymentStatus.success &&
				renderDeploySuccessComponent(goBackSuccess, editionName)}
			{status == DeploymentStatus.inProgress && renderDeployInProgressComponent()}
			{status == DeploymentStatus.failiure && renderDeployFailureComponent(goBackFailiure, retry)}
		</Modal>
	);
}
