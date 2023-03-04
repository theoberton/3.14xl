import { Modal } from '@/components';
import { useTonClient } from '@/hooks';
import { useEffect, useState, useCallback, useContext } from 'react';
import { Address } from 'ton-core';
import { NftCollection } from '@/wrappers';
import { useAsyncRetry } from 'react-use';
import { Loader } from '@/components';
import { Button, ButtonKinds } from '@/components/Button';
import _ from 'lodash';
import { composeEditObject } from './utils';

import { LoaderSizes, LoaderColors, LoaderTypes } from '@/components/interfaces';
import styles from '@/pages/CreateEdition/styles.module.scss';
import { DeploymentContext } from '@/pages/EditionEdit/deploymentContext';

import SuccessIcon from '@/assets/images/svg/common/success.svg';
import FailureIcon from '@/assets/images/svg/common/failure.svg';
import { FormValues } from '../interfaces';
import { CollectionContent } from '@/wrappers/types';

const renderDeployInProgressComponent = () => (
	<div className={styles.deploymentModal}>
		<div className={styles.deploymentModalTitle}>
			Edition is being updated
			<div className={styles.deploymentModalSpinner}>
				<Loader type={LoaderTypes.pulse} size={LoaderSizes.mini} color={LoaderColors.white} />
			</div>
		</div>
		<div className={styles.deploymentModalTitleCaption}>This may take up to 30 seconds</div>
	</div>
);

const renderDeploySuccessComponent = (goBack: () => void, editionName: string | null) => (
	<div className={styles.deploymentModal}>
		<img src={SuccessIcon} className={styles.deploymentModalImage} />
		<div className={styles.deploymentModalTitle}>{editionName} has been successfully updated</div>
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
			Edition hasn't been updated, an error occurred while trying to deploy
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
	values: FormValues;
	address: string | null;
	deploy: () => void;
	editionName: string | null;
};

const deployExpirationTime = 40 * 1000; // 40 seconds
const retryContractDeployedCheck = 2 * 1000; // every 2 seconds check whether contract is deployed or not

export function DeploymentModal({ address, deploy, values }: Props) {
	const [status, setStatus] = useState(DeploymentStatus.inProgress);
	let retryTimeoutId: ReturnType<typeof setTimeout>;
	const tonClient = useTonClient();
	const { contentDeploymentState, setContentDeploymentState, editionName } =
		useContext(DeploymentContext);

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
		} catch (error) {
			setStatus(DeploymentStatus.inProgress);
			throw error;
		}
		const content: CollectionContent = await fetch(collectionData.collectionContentUri).then(res =>
			res.json()
		);

		return { collectionData, content };
	}, [tonClient, address]);

	const retryCreateEdition = useCallback(() => {
		setStatus(DeploymentStatus.inProgress);

		setContentDeploymentState({
			isModalOpened: false,
		});

		deploy();
	}, []);

	const goBackSuccess = useCallback(() => {
		setContentDeploymentState({
			isModalOpened: false,
			deployCount: contentDeploymentState.deployCount + 1,
		});
	}, [contentDeploymentState]);

	const goBackFailiure = useCallback(() => {
		setContentDeploymentState({
			isModalOpened: false,
		});
	}, []);

	useEffect(() => {
		if (collectionDataAsync.value?.content && Object.keys(values).length > 1) {
			const exstingData = composeEditObject(collectionDataAsync.value!.content);
			const editionKeys = Object.keys(values);
			const exitingBlockainData = _.pick(exstingData, editionKeys);

			if (!_.isEqual(values, exitingBlockainData)) {
				setStatus(DeploymentStatus.inProgress);
				retryTimeoutId = setTimeout(collectionDataAsync.retry, retryContractDeployedCheck);
			} else {
				clearTimeout(retryTimeoutId);
				setStatus(DeploymentStatus.success);
			}
		} else if (collectionDataAsync.error && status == DeploymentStatus.inProgress) {
			retryTimeoutId = setTimeout(collectionDataAsync.retry, retryContractDeployedCheck);
		}

		return () => {
			if (collectionDataAsync.value?.content && Object.keys(values).length > 1) {
				clearTimeout(retryTimeoutId);
			}
		};
	}, [values, collectionDataAsync.value, collectionDataAsync.error, status]);

	const closeOnOverlayClick = status !== DeploymentStatus.inProgress;
	console.log('status', status);

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
			{status == DeploymentStatus.failiure &&
				renderDeployFailureComponent(goBackFailiure, retryCreateEdition)}
		</Modal>
	);
}
