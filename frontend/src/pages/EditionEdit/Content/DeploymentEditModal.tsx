import { Modal } from '@/components';
import { useTonClient } from '@/hooks';
import { useEffect, useState, useCallback, useContext } from 'react';
import { useAsyncRetry } from 'react-use';
import { Loader } from '@/components';
import { Button, ButtonKinds } from '@/components/Button';
import _ from 'lodash';
import { composeEditObject } from './utils';
import { updateManagerContracts } from '@/libs/apiClient';

import { LoaderSizes, LoaderColors, LoaderTypes } from '@/components/interfaces';
import styles from '@/pages/CreateEdition/styles.module.scss';
import { DeploymentContext } from '@/pages/EditionEdit/deploymentContext';

import SuccessIcon from '@/assets/images/svg/common/success.svg';
import FailureIcon from '@/assets/images/svg/common/failure.svg';
import { FormValues } from '../interfaces';
import { CollectionContent } from '@/wrappers/types';
import { composeEditionOverviewData, getFullNftCollectionData } from '@/helpers';

const renderDeployInProgressComponent = () => (
	<div className={styles.deploymentModal}>
		<div className={styles.deploymentModalTitle}>
			Edition is being updated
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

		let fullData;

		try {
			fullData = await getFullNftCollectionData(tonClient, address);
		} catch (error) {
			setStatus(DeploymentStatus.inProgress);
			throw error;
		}

		return {
			collectionData: fullData.collectionData,
			content: fullData.content,
			overviewData: composeEditionOverviewData(fullData),
		};
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
				updateManagerContracts(collectionDataAsync.value.collectionData.ownerAddress, {
					overviewData: collectionDataAsync.value.overviewData,
				});
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
	}, [
		values,
		collectionDataAsync.value,
		collectionDataAsync.value?.overviewData,
		collectionDataAsync.value?.collectionData.ownerAddress,
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
			{status == DeploymentStatus.failiure &&
				renderDeployFailureComponent(goBackFailiure, retryCreateEdition)}
		</Modal>
	);
}
